import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Converter = (props) => {
  const { state, setState } = props;
  const handleBack = (event) => {
    event.preventDefault();
    setState({ ...state, isConverterPage: false });
  };
  const handleChange = (event) => {
    event.preventDefault();
    let amount = event.target.value;
    setState({ ...state, amount: amount });
    console.log(amount);
  };
  const conversion = () => {
    const host = "api.frankfurter.app";
    fetch(
      `https://${host}/latest?amount=${state.amount}&from=${state.baseCurrency}&to=${state.conversionCurrency}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        let total = data.rates[state.conversionCurrency];
        //setTotal(total);
        setState({ ...state, total: total });
        console.log(total);
        console.log(data);
      });
  };

  const doTheSwap = (event) => {
    event.preventDefault();
    let temp = state.baseCurrency;
    setState({
      ...state,
      baseCurrency: state.conversionCurrency,
      conversionCurrency: temp,
    });
    //conversion();
  };
  useEffect(() => {
    conversion();
  }, [state.amount, state.conversionCurrency]);
  return (
    <div className="converter">
      <div id="converter-container">
        <h1>
          {state.baseCurrency} to {state.conversionCurrency}
        </h1>
        <form>
          <button onClick={doTheSwap}>swap</button>
          <label htmlFor="amount">Enter Amount </label>
          <input
            onChange={handleChange}
            name="amount"
            type="number"
            value={state.amount}
          />
        </form>
        <h1>{state.total}</h1>
        <button onClick={handleBack}>Back</button>

        <Link to={`/`}>View 30-Day Chart</Link>
      </div>
    </div>
  );
};

export { Converter };
