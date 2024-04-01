import { NewsApiResponse } from '../type';
import { useGetNewsAiQuery } from './useGetNewsAiQuery';
import { useNewsApiQuery } from './useNewsApiQuery';
import { useNyTimesApiQuery } from './useNyTimesApiQuery';
export default function useGetAllNews() {
  const { data: newsApiData, isLoading: isLoading1 } = useNewsApiQuery();
  const { data: nyTimeData, isLoading: isLoading3 } = useNyTimesApiQuery();
  const { data: newsAiData, isLoading: isLoading2 } = useGetNewsAiQuery();
  const isLoading = isLoading1 || isLoading2 || isLoading3;

  const hasLoadedData = newsApiData || nyTimeData || newsAiData;

  let combinedData: NewsApiResponse[] = [];

  if (hasLoadedData) {
    combinedData = [
      ...(newsApiData ?? []),
      ...(nyTimeData ?? []),
      ...(newsAiData ?? []),
    ];
  }


  return {
    data: combinedData,
    isLoading
  }
}
