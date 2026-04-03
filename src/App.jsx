import "./App.css";
import results from "./queries/data";
import useCollisionStats from "./hooks/useCollisionStats";
import Kpi from "./components/Kpi";

function App() {
  const data = useCollisionStats();

  console.log(data);

  return (
    <div className="main--container">
      <aside className="sidebar">
        <h3>NYC Traffic</h3>

        <ul>
          <li>Overview</li>
          <li>Deep Dive</li>
          <li>Boroughs</li>
          {/* <li></li> */}
          <li></li>
        </ul>
      </aside>
      <main>
        <h1>NYC Collision DashBoard</h1>

        <div className="kpi-container">
          <Kpi
            title={"Total Collisions"}
            value={parseInt(data.crashes).toLocaleString("en-US")}
            color={"red"}
          />
          <Kpi
            title={"People Injured"}
            value={parseInt(data.injuries).toLocaleString("en-US")}
            color={"blue"}
          />
          <Kpi
            title={"Lives Lost"}
            value={parseInt(data.livesLost).toLocaleString("en-US")}
            color={"orange"}
          />

          <Kpi
            title={"Most Accidents"}
            value={parseInt(data.borough.count).toLocaleString("en-US")}
            color={"red"}
            details={"happened in " + data.borough.borough}
          />
        </div>

        <section>
          <h2>Last 90 days NYC</h2>
          <select name="borough" id="borough">
            <option value="BRONX">Bronx</option>
            <option value="QUEENS">Queens</option>
            <option value="MANHATTAN">Manhattan</option>
            <option value="STATEN ISLAND">Staten island</option>
            <option value="BROOKLYN">Brooklyn </option>
          </select>
        </section>

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
