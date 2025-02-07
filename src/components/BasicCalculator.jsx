import React, { useState, useEffect } from "react";

function BasicCalculator() {
  const [result, setResult] = useState("");

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
      const sanitizedInput = result.replace(/\b0+(?=\d)/g, "");
      setResult(eval(sanitizedInput).toString());
    } catch {
      setResult("Error");
    }
  };

  const clearResult = () => {
    setResult("");
  };

  return (
    <div className="calculator">
      <h3>Basic Calculator</h3>
      <input type="text" value={result} readOnly />

      <div className="button-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} className="number-btn" onClick={() => handleClick(num.toString())}>
            {num}
          </button>
        ))}

        {["+", "-", "*", "/"].map((operator) => (
          <button key={operator} className="operator-btn" onClick={() => handleClick(operator)}>
            {operator}
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

export default BasicCalculator;
