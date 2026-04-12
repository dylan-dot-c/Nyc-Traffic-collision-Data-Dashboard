import React from "react";
import { RechartsDevtools } from "@recharts/devtools";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LineChartComp = (props) => {
  const result = props.data;

  const data = [
    {
      name: "Page A",
      uv: 400,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 300,
      pv: 4567,
      amt: 2400,
    },
    {
      name: "Page C",
      uv: 320,
      pv: 1398,
      amt: 2400,
    },
    {
      name: "Page D",
      uv: 200,
      pv: 9800,
      amt: 2400,
    },
    {
      name: "Page E",
      uv: 278,
      pv: 3908,
      amt: 2400,
    },
    {
      name: "Page F",
      uv: 189,
      pv: 4800,
      amt: 2400,
    },
  ];
  return (
    <LineChart
      style={{ width: "100%", aspectRatio: 1.618, maxWidth: 600 }}
      responsive
      data={result}
    >
      <CartesianGrid />
      <Line dataKey="count" />
      <XAxis dataKey="borough" data />
      <YAxis />
      <Legend />
      <Tooltip />
      <RechartsDevtools />
    </LineChart>
  );
};

export default LineChartComp;
