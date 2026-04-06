import { useEffect, useState } from "react";
import getTableData from "../queries/getTableInfo";

const useTableStats = (borough, crashDate) => {
  const [info, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getTableData(borough, crashDate);
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [borough, crashDate]);

  return { info, loading };
};

export default useTableStats;
