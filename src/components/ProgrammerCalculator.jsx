import React, { useState } from 'react';

function ProgrammerCalculator() {
  const [input, setInput] = useState('');
  const [base, setBase] = useState('decimal');

  const convert = () => {
    let value = parseInt(input, base === 'binary' ? 2 : base === 'octal' ? 8 : 10);
    return {
      binary: value.toString(2),
      octal: value.toString(8),
      decimal: value.toString(10),
      hex: value.toString(16).toUpperCase(),
    };
  };

  const conversions = input ? convert() : {};

  return (
    <div className="calculator">
      <h3>Programmer Calculator</h3>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Enter ${base} value`}
      />
      <select onChange={(e) => setBase(e.target.value)} value={base}>
        <option value="binary">Binary</option>
        <option value="octal">Octal</option>
        <option value="decimal">Decimal</option>
        <option value="hex">Hexadecimal</option>
      </select>
      <div>
        <p>Binary: {conversions.binary || '-'}</p>
        <p>Octal: {conversions.octal || '-'}</p>
        <p>Decimal: {conversions.decimal || '-'}</p>
        <p>Hexadecimal: {conversions.hex || '-'}</p>
      </div>
    </div>
  );
}

export default ProgrammerCalculator;
