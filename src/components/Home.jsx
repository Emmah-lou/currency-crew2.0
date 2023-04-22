import React from "react";
import { useState, useEffect } from "react";
import { CurrencyExchange } from "./CurrencyExchange";
import { Converter } from "./Converter";
import { Link } from "react-router-dom";
import { Charts } from "./Chart";
import "./Home.scss";

export default function Home(props) {
  const { state, setState } = props;
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
