import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div className="loading">
      <Spinner animation="border" as="span" variant="success" />
      <p>Loading Data</p>
    </div>
  );
};

export default Loading;
