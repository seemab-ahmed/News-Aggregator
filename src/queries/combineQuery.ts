import { useNewsAiQuery } from './newsAiQuery';
import { useNewsApiQuery } from './newsApiQuery';
import { useNyTimesApiQuery } from './nytimesApiQuery';
export default function useCombineQuery() {
//   const {data:newsApiData , isLoading: isLoading1 } = useNewsApiQuery();
//   const {data:nyTimeData , isLoading: isLoading3} = useNyTimesApiQuery();
  const {data:newsAiData , isLoading: isLoading2} = useNewsAiQuery();
//   const isLoading = isLoading1 || isLoading2 ||  isLoading3;
 const isLoading =  isLoading2 ;
  const combinedData = [
    //   ...newsApiData ?? [],
    // ...nyTimeData ?? [],
    ...newsAiData ?? [],
  ];

  return {
  data: combinedData,
  isLoading
}
}
