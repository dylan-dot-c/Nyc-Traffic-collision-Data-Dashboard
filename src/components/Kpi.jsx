const Kpi = ({ title, value, color, details }) => {
  return (
    <div className="kpi" style={{ borderColor: color }}>
      <h3>{title}</h3>
      <p>{value}</p>
      {details && <span>{details}</span>}
    </div>
  );
};

export default Kpi;
