import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import useCollisionStats from "./hooks/useCollisionStats";
import Kpi from "./components/Kpi";
import DataTable from "./components/DataTable";
import useTableStats from "./hooks/useTableStats";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Loading from "./components/Loading";
import PieChartComp from "./components/PieChart";
import CrashBarChart from "./components/BarChart";

function App() {
  const [borough, setBorough] = useState("");
  const data = useCollisionStats();

  const [selectedDate, setSelectedDate] = useState(null);

  // derive the effective date — user pick takes priority, fallback to latestDate
  const effectiveDate =
    selectedDate ?? (data?.stats?.latestDate ? data.stats.latestDate : null);

  const result = useTableStats(borough, effectiveDate);
  console.log("DATA", data);
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="">
      <main>
        <h1>NYC Collision DashBoard</h1>

        <hr />
        <h2>Last 90 days in NYC</h2>

        {data.loadingKPI ? (
          <Loading />
        ) : (
          <div className="kpi-container">
            <Kpi
              title={"Total Collisions"}
              value={parseInt(data.stats.crashes).toLocaleString("en-US")}
              color={"red"}
            />
            <Kpi
              title={"People Injured"}
              value={parseInt(data.stats.injuries).toLocaleString("en-US")}
              color={"blue"}
            />
            <Kpi
              title={"Lives Lost"}
              value={parseInt(data.stats.livesLost).toLocaleString("en-US")}
              color={"orange"}
            />

            <Kpi
              title={"Most Accidents"}
              value={parseInt(data.stats.borough.count).toLocaleString("en-US")}
              color={"red"}
              details={"happened in " + data.stats.borough.borough}
            />
          </div>
        )}
        <hr />

        <section className="chart--container">
          <div>
            <PieChartComp data={data.boroughStats} />
            <h4>Chart Showing Crash Distribution in NYC</h4>
          </div>
          <div>
            <CrashBarChart />
          </div>
        </section>

        <section>
          <h2>Latest Crash History in NYC</h2>

          <form>
            <h3>Filter By: </h3>

            <div>
              <label htmlFor="">Borough</label>
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
            </div>

            <div>
              <label htmlFor="">Crash Date</label>
              <DatePicker
                selected={effectiveDate}
                onChange={handleDateChange}
                showIcon
              />
            </div>
          </form>
        </section>

        <section>
          {result.loading ? (
            <Loading />
          ) : (
            <div>
              <center>
                <p>Showing {result.info.length} rows</p>
              </center>
              <DataTable columns={columns} data={result.info} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
