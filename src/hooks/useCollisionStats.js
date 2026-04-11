import { useState, useEffect } from "react";
import {
  getCrashesYTD,
  getInjuredYTD,
  getMostDangerousBoroughYTD,
} from "../queries/getKpi";
import getLatestDate from "../queries/getLatestDate";

const useCollisionStats = () => {
  const [loadingKPI, setLoading] = useState(true);

  const [stats, setStats] = useState({
    crashes: null,
    injuries: null,
    livesLost: null,
    borough: { borough: "", count: 0 },
    latestDate: new Date(),
  });

  useEffect(() => {
    const fetchStats = async () => {
      const crashesYTD = await getCrashesYTD();
      const getInjured = await getInjuredYTD();
      const dangerous = await getMostDangerousBoroughYTD();
      const maxDate = await getLatestDate();

      console.log(maxDate);

      const maxDateStr = new Date(maxDate.max_crash_date)
        .toISOString()
        .split("T")[0];
      // const factor = await getMostContributingFactor();

      setStats(() => ({
        crashes: crashesYTD,
        injuries: getInjured.injuries,
        livesLost: getInjured.lives_lost,
        borough: dangerous,
        latestDate: new Date(`${maxDateStr}T00:00:00.000`),
      }));

      setLoading(false);
    };

    fetchStats();
  }, []);

  return { stats, loadingKPI };
};

export default useCollisionStats;
