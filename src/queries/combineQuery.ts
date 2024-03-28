import { useNewsAiQuery } from './newsAiQuery';
import { useNewsApiQuery } from './newsApiQuery';
import { useNyTimesApiQuery } from './nytimesApiQuery';
export default function useCombineQuery() {

  const {data:newsArticles1 , isLoading: isLoading1} = useNewsApiQuery();
  const {data:newsArticles3 , isLoading: isLoading3} = useNyTimesApiQuery();
  const {data:newsArticles2 , isLoading: isLoading2} = useNewsAiQuery();

 const isLoading = isLoading1 || isLoading2 ||  isLoading3;
// const isLoading = isLoading1 || isLoading2 ;
  const combinedData = [
      ...newsArticles3 ?? [],
    ...newsArticles1 ?? [],
    ...newsArticles2 ?? [],
  ];

  return {
  data: combinedData,
  isLoading}
}
