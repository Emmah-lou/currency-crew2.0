import React from "react";
import { useState, useEffect } from "react";
import { CurrencyExchange } from "./CurrencyExchange";
import { Converter } from "./Converter";
import { Link } from "react-router-dom";
import { Charts } from "./Chart";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Home.scss";

export default function Home(props) {
  const { state, setState } = props;
  return (
    <div id="home">
      <Header />
      {!state.isConverterPage ? (
        <CurrencyExchange state={state} setState={setState} />
      ) : (
        <Converter state={state} setState={setState} />
      )}
      <Footer />
    </div>
  );
}
