import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { searchNewsAtom } from "../atoms/searchNewsAtom";
import { useRecoilValue } from "recoil";
import { NewsResponseInterface } from "../type";
import { mapGetNewsAiQueryData } from "./useGetNewsAiQuery";
import { mapGetNewsAPiQueryData } from "./useNewsApiQuery";
import { mapNyTimesApiQueryData } from "./useNyTimesApiQuery";

export const useGetAllNewsV2 = () => {
  const { keyword, fromDate } = useRecoilValue(searchNewsAtom);
  const queryKey = ["news", keyword, fromDate];

  const fetchData = async (url: string, params: any) => {
    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(`Failed to fetch data: ${axiosError.message}`);
    }
  };

  const { data: queryResults, isLoading, isError } = useQuery<NewsResponseInterface[], Error>(
    queryKey,
    async () => {
      const [newsApiResponse, nyTimesResponse, newsApiAiResponse] = await Promise.all([
        fetchData(process.env.REACT_APP_NEWS_API_URL!, {
          q: keyword,
          from: fromDate,
          sortBy: "publishedAt",
          pageSize: 6,
          page: 1,
          apiKey: process.env.REACT_APP_NEWS_API_KEY!,
        }),
        fetchData(process.env.REACT_APP_NYTIMES_API_URL!, {
          q: keyword,
          begin_date: fromDate,
          page: 1,
          sort: "newest",
          "api-key": process.env.REACT_APP_NYTIMES_API_KEY!,
        }),
        fetchData(process.env.REACT_APP_NEWS_API_AI_URL!, {
          action: "getArticles",
          keyword: keyword,
          articlesPage: 1,
          articlesCount: 6,
          articlesSortBy: "date",
          articlesSortByAsc: false,
          articlesArticleBodyLen: -1,
          resultType: "articles",
          dataType: ["news", "pr"],
          apiKey: process.env.REACT_APP_NEWS_API_AI_KEY!,
          forceMaxDataTimeWindow: 31,
        }),
      ]);

      const newsApiData: NewsResponseInterface[] = newsApiAiResponse.articles.results.map(mapGetNewsAiQueryData);

      const nyTimesData: NewsResponseInterface[] = nyTimesResponse.response.docs.map(mapNyTimesApiQueryData);

      const newsApiDataMapped: NewsResponseInterface[] = newsApiResponse.articles.map(mapGetNewsAPiQueryData);

      return [...newsApiData, ...nyTimesData, ...newsApiDataMapped];
    },{
        enabled:!!keyword,
        staleTime:Infinity,

    }
  );

  return { queryResults, isLoading, isError };
};
