import React, { useState, useEffect } from 'react';

function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [converted, setConverted] = useState(null);
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    const apiKey = process.env.REACT_APP_CURRENCY_API_KEY;
    fetch(`https://api.exchangerate-api.com/v4/latest/USD?apikey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => setRates(data.rates));
  }, []);

  const convert = () => {
    if (rates[currency]) {
      setConverted((amount * rates[currency]).toFixed(2));
    }
  };

  return (
    <div className="calculator">
      <h3>Currency Converter</h3>
      <input
        type="number"
        placeholder="Amount in USD"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select onChange={(e) => setCurrency(e.target.value)} value={currency}>
        {Object.keys(rates).map((curr) => (
          <option key={curr} value={curr}>
            {curr}
          </option>
        ))}
      </select>
      <button onClick={convert}>Convert</button>
      {converted && <p>Converted Amount: {converted} {currency}</p>}
    </div>
  );
}

export default CurrencyConverter;
