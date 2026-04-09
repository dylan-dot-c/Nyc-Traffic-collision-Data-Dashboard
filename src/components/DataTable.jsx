import Table from "react-bootstrap/Table";
import { Link } from "react-router";

const DataTable = ({ columns, data }) => {
  console.log(data);
  return (
    <Table bordered striped hover size="sm" responsive>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.crash_id}>
            {Object.entries(item).map((row, idx) => {
              if (idx == 0) {
                return (
                  <td key={row[0]}>
                    <Link to={`/crash/${row[1]}`}>{row[1]}</Link>
                  </td>
                );
              }
              if (idx == 1) {
                return (
                  <td key={row[0]}>
                    {new Date(row[1]).toLocaleDateString("en-US")}
                  </td>
                );
              } else {
                return <td key={row[0]}>{row[1]}</td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
