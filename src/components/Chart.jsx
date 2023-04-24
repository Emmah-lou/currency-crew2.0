import React, { useEffect } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./Chart.scss";

const Charts = (props) => {
  const { state, setState } = props;
  const [chartData, setChartData] = React.useState([]);
  const [isExpandedView, setIsExpandedView] = React.useState(false);
  const getChartData = () => {
    const stockApiKey = "OMZGXK5NKES2KJV5";
    const webUrl = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${state.baseCurrency}&to_symbol=${state.conversionCurrency}&apikey=${stockApiKey}`;
    fetch(webUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data["Time Series FX (Daily)"]);
        for (let key in data["Time Series FX (Daily)"]) {
          let value = data["Time Series FX (Daily)"][key];

          let pointSets = {
            x: key,
            y: value["4. close"],
          };
          setChartData((chartData) => [...chartData, pointSets]);
        }
      });
  };
  useEffect(() => {
    getChartData();
  }, []);

  const handleBack = (event) => {
    event.preventDefault();
    setState({ ...state, isChartPage: false, isExpandedView: false });
  };

  const oneMonthChart = chartData
    .map((data) => ({ date: data.x, rate: data.y }))
    .slice(0, 30);
  const threeMonthChart = chartData
    .map((data) => ({ date: data.x, rate: data.y }))
    .slice(0, 90);
  const dataMessageOne = <p>Data Represents a 30 Day Period</p>;
  const dataMessageTwo = <p>Data Represents a 90 Day Period</p>;

  const handleExpandedView = (event) => {
    setIsExpandedView(!isExpandedView);
  };

  return (
    <div className="chart">
      <div id="chart-container">
        <h3>
          Chart Data for - {state.baseCurrency}|{state.conversionCurrency}
        </h3>
        <div id="mobile-view">
          <h2>**Chart Data Only available in Desktop**</h2>
        </div>
        <div id="desktop-view">
          {isExpandedView ? (
            <MyThreeMonthChart data={threeMonthChart} />
          ) : (
            <MyChart data={oneMonthChart} />
          )}
          {isExpandedView ? dataMessageTwo : dataMessageOne}
        </div>

        <button onClick={handleBack}>Back to Converter</button>
        <button onClick={handleExpandedView}>Expanded Chart</button>
      </div>
    </div>
  );
};

const MyThreeMonthChart = ({ data }) => (
  <LineChart width={600} height={400} data={data}>
    <XAxis dataKey="date" />
    <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
    <CartesianGrid strokeDasharray="7 7" />
    <Tooltip />
    <Line type="monotone" dataKey="rate" stroke="green" />
  </LineChart>
);

const MyChart = ({ data }) => (
  <LineChart width={400} height={200} data={data}>
    <XAxis dataKey="date" />
    <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
    <CartesianGrid strokeDasharray="7 7" />
    <Tooltip />
    <Line type="monotone" dataKey="rate" stroke="green" />
  </LineChart>
);

export { Charts };
