import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
