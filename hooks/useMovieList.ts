import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function useMovieList(srcParam: string) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/movies?search=${srcParam}`,
    fetcher
  );
  return {
    data,
    isLoading,
    error,
    mutate,
  };
}
