import React, { useState, useEffect } from "react";

function ScientificCalculator() {
  const [result, setResult] = useState("");

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;

      if (!isNaN(key)) {
        setResult((prev) => prev + key);
      } else if (["+","-","*","/","^","(",")"].includes(key)) {
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
      setResult(eval(result).toString());
    } catch {
      setResult("Error");
    }
  };

  const clearResult = () => {
    setResult("");
  };

  const handleScientificOperation = (operation) => {
    try {
      const value = eval(result);
      switch (operation) {
        case "sin":
          setResult(Math.sin(value).toFixed(5).toString());
          break;
        case "cos":
          setResult(Math.cos(value).toFixed(5).toString());
          break;
        case "tan":
          setResult(Math.tan(value).toFixed(5).toString());
          break;
        case "log":
          setResult(Math.log(value).toFixed(5).toString());
          break;
        case "sqrt":
          setResult(Math.sqrt(value).toFixed(5).toString());
          break;
        default:
          break;
      }
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className="calculator-container">
      <h3>Scientific Calculator</h3>
      <input type="text" value={result} readOnly />

      <div className="button-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} className="number-btn" onClick={() => handleClick(num.toString())}>
            {num}
          </button>
        ))}

        {["+", "-", "*", "/", "^", "(", ")"].map((operator) => (
          <button key={operator} className="operator-btn" onClick={() => handleClick(operator)}>
            {operator}
          </button>
        ))}

        {["sin", "cos", "tan", "log", "sqrt"].map((func) => (
          <button key={func} className="operator-btn" onClick={() => handleScientificOperation(func)}>
            {func}
          </button>
        ))}

        <button className="operator-btn" onClick={calculateResult}>
          =
        </button>
        <button className="operator-btn" onClick={clearResult}>
          C
        </button>
      </div>

      <div className="result">{result ? `Result: ${result}` : ""}</div>
    </div>
  );
}

export default ScientificCalculator;
