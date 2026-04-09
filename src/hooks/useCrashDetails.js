import { useState, useEffect } from "react";
import getCrash from "../queries/getCrash";

const useCrashDetails = (crashID) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await getCrash(crashID);
      setData(res.data[0]);
      setLoading(false);
    };

    load();
  }, [crashID]);

  return { data, loading };
};

export default useCrashDetails;
