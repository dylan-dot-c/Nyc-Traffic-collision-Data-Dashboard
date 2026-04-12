import { RechartsDevtools } from "@recharts/devtools";
import { Legend, PieChart, Pie, Tooltip, Sector } from "recharts";

const COLORS = [
  "#0088FE",
  "rgb(109, 109, 109)",
  "#FFBB28",
  "#FF8042",
  "#A28CF6",
  "#FF6B6B",
];

const PieChartComp = (props) => {
  const result = props.data;

  const formatted = result.map((item, idx) => ({
    name: item.borough, // rename here
    value: Number(item.count), // or whatever your value key is
    fill: COLORS[idx % COLORS.length],
  }));

  console.log(formatted);
  return (
    <PieChart
      style={{
        width: "100%",
        aspectRatio: 1.618,
        maxWidth: 700,
        background: "#fff",
      }}
      responsive
      title="Pie Chart Showing Crash Distribution among borough"
    >
      <Pie
        name="Chart"
        label
        width={400}
        data={formatted}
        cx="50%"
        cy="50%"
        outerRadius="50%"
        fill="#2a2677"
        isAnimationActive={true}
        shape={(props) => <Sector {...props} fill={props.fill} />}
      ></Pie>

      <Legend />
      <Tooltip />
      <RechartsDevtools />
    </PieChart>
  );
};

export default PieChartComp;
