import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const CurrencyExchangeSelector = (props) => {
  const { state, setState } = props;
  const handleCurrencyChange = (event) => {
    event.preventDefault();
    //console.log(event.target.value);
    setState({ ...state, baseCurrency: event.target.value });
  };
  useEffect(() => {
    //console.log(state.baseCurrency);
  }, [state.baseCurrency]);

  return (
    <div id="base-rate">
      <form onChange={handleCurrencyChange}>
        <label htmlFor="baseCurrency">Base Rate - </label>
        <select name="baseCurrency">
          <option value="AUD">AUD</option>
          <option value="BGN">BGN</option>
          <option value="BRL">BRL</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="CNY">CNY</option>
          <option value="CZK">CZY</option>
          <option value="DKK">DKK</option>
          <option value="GBP">GBP</option>
          <option value="HKD">HKD</option>
          <option value="HUF">HUF</option>
          <option value="IDR">IDR</option>
          <option value="ILS">ILS</option>
          <option value="INR">INR</option>
          <option value="ISK">ISK</option>
          <option value="JPY">JPY</option>
          <option value="KRW">KRW</option>
          <option value="MXN">MXN</option>
          <option value="MYR">MYR</option>
          <option value="NOK">NOK</option>
          <option value="NZD">NZD</option>
          <option value="PHP">PHP</option>
          <option value="PLN">PLN</option>
          <option value="RON">RON</option>
          <option value="SEK">SEK</option>
          <option value="SGD">SGD</option>
          <option value="THB">THB</option>
          <option value="TRY">TRY</option>
          <option value="USD">USD</option>
          <option value="ZAR">ZAR</option>
        </select>
      </form>
    </div>
  );
};

const ExchangeItem = (props) => {
  const { state, setState, currency, rate } = props;
  const handleChange = (event) => {
    event.preventDefault();
    //console.log(event.target.value);
    setState({ ...state, conversionCurrency: currency, isConverterPage: true });
  };
  return (
    <li key={`${currency}`}>
      <button onClick={handleChange}>
        {state.baseCurrency} - {currency}
      </button>
      <span> - {rate}</span>
    </li>
  );
};

const ExchangeList = (props) => {
  const { state, setState } = props;
  const fetchBaseRateList = async () => {
    const host = "api.frankfurter.app";
    fetch(`https://${host}/latest?from=${state.baseCurrency}`)
      .then((response) => response.json())
      .then((response) => setState({ ...state, rates: response.rates }))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBaseRateList();
  }, [state.baseCurrency]);

  const baseRateListArray = Object.entries(state.rates);

  return (
    <div className="home_baseRateList">
      <ul className="rates-list">
        {baseRateListArray.map((item) => {
          return (
            <ExchangeItem
              state={state}
              setState={setState}
              key={item[0]}
              currency={item[0]}
              rate={item[1]}
            />
          );
        })}
      </ul>
    </div>
  );
};

const CurrencyExchange = (props) => {
  const { state, setState } = props;
  return (
    <div id="currency-exchange">
      <CurrencyExchangeSelector state={state} setState={setState} />
      <ExchangeList state={state} setState={setState} />
    </div>
  );
};

export { CurrencyExchange };
