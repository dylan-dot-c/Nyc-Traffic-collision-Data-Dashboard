import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useChartData from "../hooks/useChartData";
import Loading from "./Loading";
const months = [
  "Jan", // 0
  "Feb", // 1
  "Mar", // 2
  "Apr", // 3
  "May", // 4
  "Jun", // 5
  "Jul", // 6
  "Aug", // 7
  "Sep", // 8
  "Oct", // 9
  "Nov", // 10
  "Dec", // 11
];
const COLORS = [
  "#00fe3f",
  "rgb(226, 0, 0)",
  "#ff7e28",
  "#42ffa1",
  "#A28CF6",
  "#f1c500",
];
const CrashBarChart = () => {
  const { loading, crashData } = useChartData();

  const formattedData = crashData.map((item, idx) => {
    const date = new Date(item.month);

    return {
      count: Number(item.crash_count),
      month: `${months[date.getMonth()]}`,
      fill: COLORS[idx % COLORS.length],
    };
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h4>Crash Count for the last 12 Months(Excluding current)</h4>

      <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.3,
        }}
        responsive
        data={formattedData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" label />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />

        <Bar
          dataKey="count"
          label
          fill="#c2bfff"
          activeBar={{ fill: "#510353", stroke: "white" }}
          radius={[30, 30, 0, 0]}
        />
      </BarChart>
    </div>
  );
};

export default CrashBarChart;
