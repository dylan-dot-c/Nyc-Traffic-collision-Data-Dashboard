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
  "#0088FE",
  "rgb(0, 124, 48)",
  "#FFBB28",
  "#FF8042",
  "#A28CF6",
  "#FF6B6B",
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
          aspectRatio: 1.618,
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
        <XAxis dataKey="month" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />

        <Bar
          dataKey="count"
          fill="#c2bfff"
          activeBar={{ fill: "pink", stroke: "blue" }}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </div>
  );
};

export default CrashBarChart;
