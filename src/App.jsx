import React, { useState } from 'react';
import Menu from './components/Menu';
import BasicCalculator from './components/BasicCalculator';
import ScientificCalculator from './components/ScientificCalculator';
import ProgrammerCalculator from './components/ProgrammerCalculator';
import BMICalculator from './components/BMICalculator';
import FinancialCalculator from './components/FinancialCalculator';
import CurrencyConverter from './components/CurrencyConverter';
import UnitConverter from './components/UnitConverter';
import './styles.css';

function App() {
  const [mode, setMode] = useState('basic');

  const renderCalculator = () => {
    switch (mode) {
      case 'basic':
        return <BasicCalculator />;
      case 'scientific':
        return <ScientificCalculator />;
      case 'programmer':
        return <ProgrammerCalculator />;
      case 'bmi':
        return <BMICalculator />;
      case 'financial':
        return <FinancialCalculator />;
      case 'currency':
        return <CurrencyConverter />;
      case 'converter':
        return <UnitConverter />;
      default:
        return <BasicCalculator />;
    }
  };

  return (
    <div className="app">
      <h1>Multi-Mode Calculator</h1>
      <Menu setMode={setMode} />
      <div className="calculator-container">{renderCalculator()}</div>
    </div>
  );
}

export default App;
