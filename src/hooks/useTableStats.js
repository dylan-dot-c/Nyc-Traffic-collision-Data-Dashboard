import { useEffect, useState } from "react";
import getTableData from "../queries/getTableInfo";

const useTableStats = () => {
  const [info, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getTableData();
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { info, loading };
};

export default useTableStats;
