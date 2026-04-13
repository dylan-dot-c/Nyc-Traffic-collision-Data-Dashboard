//asked claude to rewrite component for better formatting of Data
import { useParams } from "react-router";
import useCrashDetails from "../hooks/useCrashDetails";
import Loading from "../components/Loading";

const CrashDetails = () => {
  const params = useParams();
  const { loading, data } = useCrashDetails(params.crash_id);

  if (loading) return <Loading />;

  if (data == null) return <h2>Incorrect Crash ID: {params.crash_id}</h2>;

  const hasInjuries =
    +data.numberOfPersonsInjured > 0 || +data.numberOfPersonsKilled > 0;

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "—";

  const val = (v) => (v !== undefined && v !== null && v !== "" ? v : "—");

  return (
    <div className="crash-details">
      <div className="crash-header">
        <div>
          <h1 className="crash-title">Crash #{data.collisionId}</h1>
          <p className="crash-subtitle">
            {val(data.borough)} · {formatDate(data.crashDate)} ·{" "}
            {val(data.crashTime)}
          </p>
        </div>
        {hasInjuries && (
          <span className="crash-badge crash-badge--danger">
            Injuries reported
          </span>
        )}
      </div>

      <div className="crash-metrics">
        {[
          { label: "Persons injured", value: data.numberOfPersonsInjured },
          { label: "Persons killed", value: data.numberOfPersonsKilled },
        ].map(({ label, value }) => (
          <div key={label} className="metric-card">
            <p className="metric-card__label">{label}</p>
            <p className="metric-card__value">{val(value)}</p>
          </div>
        ))}
      </div>

      <div className="crash-section">
        <p className="crash-section__heading">By road user</p>
        <table className="crash-table">
          <thead>
            <tr>
              {["Type", "Injured", "Killed"].map((h) => (
                <th
                  key={h}
                  className={`crash-table__th ${h !== "Type" ? "crash-table__th--center" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                type: "Pedestrians",
                injured: data.numberOfPedestriansInjured,
                killed: data.numberOfPedestriansKilled,
              },
              {
                type: "Cyclists",
                injured: data.numberOfCyclistInjured,
                killed: data.numberOfCyclistKilled,
              },
              {
                type: "Motorists",
                injured: data.numberOfMotoristInjured,
                killed: data.numberOfMotoristKilled,
              },
            ].map(({ type, injured, killed }) => (
              <tr key={type} className="crash-table__row">
                <td className="crash-table__td">{type}</td>
                <td className="crash-table__td crash-table__td--center">
                  {val(injured)}
                </td>
                <td className="crash-table__td crash-table__td--center">
                  {val(killed)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="crash-section">
        <p className="crash-section__heading">Incident details</p>
        <dl className="crash-dl">
          {[
            { label: "On street", value: data.onStreetName },
            { label: "Off street", value: data.offStreetName },
            { label: "Vehicle type", value: data.vehicleTypeCode1 },
            {
              label: "Contributing factor",
              value: data.contributingFactorVehicle1,
            },
          ].map(({ label, value }) => (
            <div key={label} className="crash-dl__item">
              <dt className="crash-dl__label">{label}</dt>
              <dd className="crash-dl__value">{val(value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default CrashDetails;
