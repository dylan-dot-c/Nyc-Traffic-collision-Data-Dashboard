import "./App.css";
import results from "./queries/data";
import useCollisionStats from "./hooks/useCollisionStats";

function App() {
  const data = useCollisionStats();

  console.log(data);

  return (
    <div className="main--container">
      <aside className="sidebar"></aside>
      <main>
        <h1>NYC Collision DashBoard</h1>

        <div className="kpi-container">
          <div className="kpi">
            <p>{data.ytd}</p>
            <h2>Crashes since 2026</h2>
          </div>
          <div className="kpi">
            <p>{data.last7}</p>
            <h2>Crashes since 2026</h2>
          </div>
          <div className="kpi">
            <p>{data.currentMonth}</p>
            <h2>Crashes since 2026</h2>
          </div>
        </div>
        {results.map((result, idx) => (
          <li key={idx}>
            {new Date(result.crash_date).toString().slice(0, 15) + " @"}
            {result.crash_time} {result.borough}
          </li>
        ))}
      </main>
    </div>
  );
}

export default App;
