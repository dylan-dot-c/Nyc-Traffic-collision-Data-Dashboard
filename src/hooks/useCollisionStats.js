import useSWR from "swr";
import {
  getCrashesYTD,
  getInjuredYTD,
  getMostDangerousBoroughYTD,
} from "../queries/getKpi";
import getLatestDate from "../queries/getLatestDate";

const fetchCollisionStats = async () => {
  const [crashesYTD, injured, dangerous, maxDate] = await Promise.all([
    getCrashesYTD(),
    getInjuredYTD(),
    getMostDangerousBoroughYTD(),
    getLatestDate(),
  ]);

  const maxDateStr = new Date(maxDate.max_crash_date)
    .toISOString()
    .split("T")[0];

  return {
    stats: {
      crashes: crashesYTD,
      injuries: injured.injuries,
      livesLost: injured.lives_lost,
      borough: dangerous.data[0],
      latestDate: new Date(`${maxDateStr}T00:00:00.000`),
    },
    boroughStats: dangerous.data,
  };
};

const useCollisionStats = () => {
  const { data, error, isLoading } = useSWR(
    "collision-stats",
    fetchCollisionStats,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      refreshInterval: 15 * 60 * 1000, // optional
    },
  );

  return {
    stats: data?.stats ?? {
      crashes: null,
      injuries: null,
      livesLost: null,
      borough: { borough: "", count: 0 },
      latestDate: new Date(),
    },
    boroughStats: data?.boroughStats ?? [],
    loadingKPI: isLoading,
    error,
  };
};

export default useCollisionStats;
