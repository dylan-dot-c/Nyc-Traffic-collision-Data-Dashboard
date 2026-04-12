import { useState, useEffect } from "react";
import getCrashesPerMonth from "../queries/getCrashesPerMonth";

const useChartData = () => {
  const [crashData, setCrashData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const result = await getCrashesPerMonth();
      setCrashData(result.data);

      setLoading(false);
    };

    load();
  }, []);

  return { loading, crashData };
};

export default useChartData;
