import React, { useState, useEffect } from "react";

function BasicCalculator() {
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;

      if (!isNaN(key)) {
        setResult((prev) => prev + key);
      } else if (["+", "-", "*", "/"].includes(key)) {
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
      const evaluatedResult = eval(result).toString();
      setResult(evaluatedResult);
      setHistory([...history, `${result} = ${evaluatedResult}`]);
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

  return (
    <div className="calculator">
      <h3>Basic Calculator</h3>
      <input type="text" value={result} readOnly />

      <div className="button-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} onClick={() => handleClick(num.toString())}>
            {num}
          </button>
        ))}

        {["+", "-", "*", "/"].map((operator) => (
          <button key={operator} onClick={() => handleClick(operator)}>
            {operator}
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

export default BasicCalculator;
