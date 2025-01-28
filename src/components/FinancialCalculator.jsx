import React, { useState } from 'react';

function FinancialCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compound, setCompound] = useState(false);
  const [simple, setSimple] = useState(true);
  const [result, setResult] = useState('');

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      setResult("Please enter valid numbers for all fields.");
      return;
    }

    let calculatedResult = 0;

    if (compound) {
      calculatedResult = p * Math.pow(1 + r, t); // Compound Interest
    } else if (simple) {
      calculatedResult = p + p * r * t; // Simple Interest
    }

    setResult(`Result: ${calculatedResult.toFixed(2)}`);
  };

  return (
    <div className="calculator">
      <h3>Financial Calculator</h3>
      
      {/* Checkbox for Compound Interest */}
      <label>
        <input
          type="checkbox"
          checked={simple}
          onChange={() => {
            setSimple(true);
            setCompound(false);
          }}
        />
        Simple Interest
      </label>

      {/* Checkbox for Compound Interest */}
      <label>
        <input
          type="checkbox"
          checked={compound}
          onChange={() => {
            setCompound(true);
            setSimple(false);
          }}
        />
        Compound Interest
      </label>

      <div>
        <input
          type="number"
          placeholder="Principal"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rate of Interest (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Time (years)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <button onClick={calculate}>Calculate</button>
      {result && <p className="result">{result}</p>}
    </div>
  );
}

export default FinancialCalculator;
