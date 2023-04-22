import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import "./App.scss";

function App() {
  const [state, setState] = useState({
    baseCurrency: "AUD",
    rates: [],
    conversionCurrency: "USD",
    amount: 1,
    total: 0,
    isConverterPage: false,
    isChartPage: false,
  });
  return (
    <Routes>
      <Route path="/" element={<Home state={state} setState={setState} />} />
    </Routes>
  );
}

export default App;
