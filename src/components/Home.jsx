import React from "react";
import { useState, useEffect } from "react";
import { CurrencyExchange } from "./CurrencyExchange";
import { Converter } from "./Converter";
import "./Home.scss";

export default function Home(props) {
  const [state, setState] = useState({
    baseCurrency: "AUD",
    rates: [],
    conversionCurrency: "USD",
    amount: 1,
    total: 0,
    isConverterPage: false,
  });
  return (
    <div className="home">
      {state.isConverterPage ? (
        <Converter state={state} setState={setState} />
      ) : (
        <CurrencyExchange state={state} setState={setState} />
      )}
    </div>
  );
}
