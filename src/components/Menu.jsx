import React from 'react';

function Menu({ setMode }) {
  return (
    <nav className="menu">
      <button onClick={() => setMode('basic')}>Basic Calculator</button>
      <button onClick={() => setMode('scientific')}>Scientific Calculator</button>
      <button onClick={() => setMode('programmer')}>Programmer Calculator</button>
      <button onClick={() => setMode('bmi')}>BMI Calculator</button>
      <button onClick={() => setMode('financial')}>Financial Calculator</button>
      <button onClick={() => setMode('currency')}>Currency Converter</button>
      <button onClick={() => setMode('converter')}>Unit Converter</button>
    </nav>
  );
}

export default Menu;
