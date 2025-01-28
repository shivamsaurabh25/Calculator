import React, { useState } from 'react';

function UnitConverter() {
  const [input, setInput] = useState('');
  const [unit, setUnit] = useState('metersToFeet');
  const convert = () => {
    switch (unit) {
      case 'metersToFeet':
        return (input * 3.28084).toFixed(2);
      case 'feetToMeters':
        return (input / 3.28084).toFixed(2);
      case 'kgToLbs':
        return (input * 2.20462).toFixed(2);
      case 'lbsToKg':
        return (input / 2.20462).toFixed(2);
      default:
        return input;
    }
  };

  return (
    <div className="calculator">
      <h3>Unit Converter</h3>
      <input
        type="number"
        placeholder="Value"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <select onChange={(e) => setUnit(e.target.value)} value={unit}>
        <option value="metersToFeet">Meters to Feet</option>
        <option value="feetToMeters">Feet to Meters</option>
        <option value="kgToLbs">Kilograms to Pounds</option>
        <option value="lbsToKg">Pounds to Kilograms</option>
      </select>
      <p>Converted Value: {convert()}</p>
    </div>
  );
}

export default UnitConverter;
