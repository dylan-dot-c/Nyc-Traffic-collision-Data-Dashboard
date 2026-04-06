import { useState, useEffect } from "react";
import {
  getCrashesYTD,
  getInjuredYTD,
  getMostDangerousBoroughYTD,
} from "../queries/getKpi";

const useCollisionStats = () => {
  const [loadingKPI, setLoading] = useState(true);

  const [stats, setStats] = useState({
    crashes: null,
    injuries: null,
    livesLost: null,
    borough: { borough: "", count: 0 },
  });

  useEffect(() => {
    const fetchStats = async () => {
      const crashesYTD = await getCrashesYTD();
      const getInjured = await getInjuredYTD();
      const dangerous = await getMostDangerousBoroughYTD();
      // const factor = await getMostContributingFactor();

      setStats(() => ({
        crashes: crashesYTD,
        injuries: getInjured.injuries,
        livesLost: getInjured.lives_lost,
        borough: dangerous,
      }));

      setLoading(false);
    };

    fetchStats();
  }, []);

  return { stats, loadingKPI };
};

export default useCollisionStats;
