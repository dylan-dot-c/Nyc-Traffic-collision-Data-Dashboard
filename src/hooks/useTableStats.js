import { useEffect, useState } from "react";
import getTableData from "../queries/getTableInfo";

const useTableStats = (borough) => {
  const [info, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getTableData(borough);
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [borough]);

  return { info, loading };
};

export default useTableStats;
