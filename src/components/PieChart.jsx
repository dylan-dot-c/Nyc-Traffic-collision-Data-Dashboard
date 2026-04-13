import { RechartsDevtools } from "@recharts/devtools";
import { Legend, PieChart, Pie, Tooltip, Sector } from "recharts";

const COLORS = [
  "#00fe7f",
  "rgb(109, 109, 109)",
  "#fcac00",
  "#fc5400",
  "#3d0dff",
  "#ff1919",
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
        aspectRatio: 1.2,
        maxWidth: 700,
      }}
      responsive
      title="Pie Chart Showing Crash Distribution among borough"
    >
      <Pie
        name="Chart"
        label
        width={500}
        data={formatted}
        cx="50%"
        cy="50%"
        outerRadius="100%"
        fill="#2a2677"
        isAnimationActive={true}
        shape={(props) => <Sector {...props} fill={props.fill} />}
      ></Pie>

      <Tooltip />
      <RechartsDevtools />
    </PieChart>
  );
};

export default PieChartComp;
