import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrencyExchange } from "./CurrencyExchange";
import { Converter } from "./Converter";
//import Header from "./Header";
//import Footer from "./Footer";
//import Home_BaseRate from "./Home_BaseRate";
//import Home_BaseRateList from "./Home_BaseRateList";
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
