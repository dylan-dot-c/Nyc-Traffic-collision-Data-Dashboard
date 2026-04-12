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
