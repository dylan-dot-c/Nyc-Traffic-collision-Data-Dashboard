import { useState, useEffect } from "react";
import {
  getCrashesYTD,
  getLastWeekCrashes,
  getCrashesMTD,
} from "../queries/getKpi";

const useCollisionStats = () => {
  const [stats, setStats] = useState({
    ytd: null,
    currentMonth: null,
    last7: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const crashesYTD = await getCrashesYTD();
      const crashesLast7Days = await getLastWeekCrashes();
      const crashesYesterday = await getCrashesMTD();

      setStats(() => ({
        currentMonth: crashesYesterday.data[0].count,
        ytd: crashesYTD.data[0].count,
        last7: crashesLast7Days.data[0].count,
      }));
    };

    fetchStats();
  }, []);

  return stats;
};

export default useCollisionStats;
