import React, { useState, useEffect } from "react";

function ScientificCalculator() {
  const [result, setResult] = useState("");
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("scientificCalcHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("scientificCalcHistory", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;

      if (!isNaN(key)) {
        setResult((prev) => prev + key);
      } else if (["+", "-", "*", "/", "^", "(", ")"].includes(key)) {
        setResult((prev) => prev + key);
      } else if (key === "Enter") {
        calculateResult();
      } else if (key === "Backspace") {
        setResult((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleClick = (value) => {
    setResult(result + value);
  };

  const calculateResult = () => {
    try {
      const sanitizedInput = result.replace(/\b0+(?=\d)/g, "");
      setResult(eval(sanitizedInput).toString());
      setHistory([...history, `${result} = ${sanitizedInput}`]);
    } catch {
      setResult("Error");
    }
  };

  const clearResult = () => {
    setResult("");
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleScientificOperation = (operation) => {
    try {
      const value = eval(result);
      let operationResult = "";
      switch (operation) {
        case "sin":
          operationResult = Math.sin(value).toFixed(5).toString();
          break;
        case "cos":
          operationResult = Math.cos(value).toFixed(5).toString();
          break;
        case "tan":
          operationResult = Math.tan(value).toFixed(5).toString();
          break;
        case "log":
          operationResult = Math.log(value).toFixed(5).toString();
          break;
        case "sqrt":
          operationResult = Math.sqrt(value).toFixed(5).toString();
          break;
        default:
          break;
      }
      setResult(operationResult);
      setHistory([...history, `${operation}(${value}) = ${operationResult}`]);
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className="calculator">
      <h3>Scientific Calculator</h3>
      <input type="text" value={result} readOnly />

      <div className="button-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} onClick={() => handleClick(num.toString())}>
            {num}
          </button>
        ))}

        {["+", "-", "*", "/", "^", "(", ")"].map((operator) => (
          <button key={operator} onClick={() => handleClick(operator)}>
            {operator}
          </button>
        ))}

        {["sin", "cos", "tan", "log", "sqrt"].map((func) => (
          <button key={func} onClick={() => handleScientificOperation(func)}>
            {func}
          </button>
        ))}

        <button onClick={calculateResult}>=</button>
        <button onClick={clearResult}>C</button>
      </div>

      <div>
        <h4>History</h4>
        <ul>
          {history.map((entry, index) => (
            <li key={index} onClick={() => setResult(entry.split(" = ")[0])}>
              {entry}
            </li>
          ))}
        </ul>
        {history.length > 0 && <button onClick={clearHistory}>Clear History</button>}
      </div>
    </div>
  );
}

export default ScientificCalculator;
