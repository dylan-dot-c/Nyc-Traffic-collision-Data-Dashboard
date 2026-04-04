import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import useCollisionStats from "./hooks/useCollisionStats";
import Kpi from "./components/Kpi";
import DataTable from "./components/DataTable";
import useTableStats from "./hooks/useTableStats";
import { useState } from "react";

function App() {
  const [borough, setBorough] = useState("");
  const [startDate, setStartDate] = useState(formatForInput(new Date()));

  const data = useCollisionStats();
  const result = useTableStats(borough, startDate);

  function formatForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");

    return `${year}-${month}-${day}`; // yyyy-MM-dd
  }

  console.log(result);
  const columns = [
    {
      name: "ID",
      key: "collision_id",
    },
    {
      name: "Crash Date",
      key: "crash_date",
    },
    {
      name: "Crash Time",
      key: "crash_time",
    },
    {
      name: "Borough",
      key: "borough",
    },
    {
      name: "Street",
      key: "street",
    },

    {
      name: "Injuries",
      key: "number_of_persons_injured",
    },
    {
      name: "Lives Lost",
      key: "number_of_persons_killed",
    },
    {
      name: "Reason",
      key: "contributing_factor_vehicle_1",
    },
    {
      name: "Vehicle Type",
      key: "vehicle_type_code1",
    },
  ];

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
          <select
            name="borough"
            id="borough"
            value={borough}
            onChange={(e) => setBorough(e.target.value)}
          >
            <option value="">All</option>
            <option value="BRONX">Bronx</option>
            <option value="QUEENS">Queens</option>
            <option value="MANHATTAN">Manhattan</option>
            <option value="STATEN ISLAND">Staten island</option>
            <option value="BROOKLYN">Brooklyn </option>
          </select>
        </section>

        <input
          type="date"
          onChange={(e) =>
            setStartDate(formatForInput(new Date(e.target.value)))
          }
          value={startDate}
        />

        {result.loading ? (
          <h1>Loading</h1>
        ) : (
          <DataTable columns={columns} data={result.info} />
        )}
      </main>
    </div>
  );
}

export default App;
