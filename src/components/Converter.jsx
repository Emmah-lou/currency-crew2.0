import React from "react";
import "./Converter.scss";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Charts } from "./Chart";

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
        {state.isChartPage ? (
          <Charts state={state} setState={setState} />
        ) : (
          <div>
            <h1>
              {state.baseCurrency} to {state.conversionCurrency}
            </h1>
            <button onClick={doTheSwap}>swap</button>
            <form>
              <label htmlFor="amount">Enter Amount </label>
              <input
                onChange={handleChange}
                name="amount"
                type="number"
                value={state.amount}
              />
            </form>
            <h2>{state.total}</h2>
            <button onClick={handleBack}>Back</button>
            <button onClick={() => setState({ ...state, isChartPage: true })}>
              Chart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { Converter };
