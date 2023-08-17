import React, { useEffect, useState } from 'react';

const CurrencyConverter: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState('CAD');
  const [targetCurrency, setTargetCurrency] = useState('INR');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    fetchExchangeRate();
  }, [baseCurrency, targetCurrency]);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/78a4d34238ad43685952c846/latest/${baseCurrency}`
      );
      const data = await response.json();
      const rate = data.conversion_rates[targetCurrency];
      setExchangeRate(rate);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  const handleBaseCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseCurrency(e.target.value);
  };

  const handleTargetCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetCurrency(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  useEffect(() => {
    setConvertedAmount(amount * exchangeRate);
  }, [amount, exchangeRate]);

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <label>Base Currency:</label>
        <select value={baseCurrency} onChange={handleBaseCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <div>
        <label>Target Currency:</label>
        <select value={targetCurrency} onChange={handleTargetCurrencyChange}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div>
        <label>Converted Amount:</label>
        <span>{convertedAmount.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CurrencyConverter;
