import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useBillboard = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/random", fetcher);
  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useBillboard;
