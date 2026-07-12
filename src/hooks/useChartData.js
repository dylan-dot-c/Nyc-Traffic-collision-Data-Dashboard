import useSWR from "swr";
import getCrashesPerMonth from "../queries/getCrashesPerMonth";

const fetcher = async () => {
  const result = await getCrashesPerMonth();
  return result.data;
};

const useChartData = () => {
  const { data, error, isLoading } = useSWR("crashes-per-month", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    refreshInterval: 5 * 60 * 1000,
  });

  return {
    crashData: data ?? [],
    loading: isLoading,
    error,
  };
};

export default useChartData;
