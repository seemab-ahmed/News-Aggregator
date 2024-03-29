// Different Approach for fetching news form different data source using promise.all
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";

import { searchNewsAtom } from "../atoms/searchNewsAtom";
import { useRecoilValue } from "recoil";

interface Article {
  id: string;
  source: string;
  author?: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  date: string;
}

export const useNewsQuery = () => {
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

  const { data: queryResults, isLoading, isError } = useQuery<Article[], Error>(
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

      const newsApiData: Article[] = newsApiAiResponse.articles.results.map((article: any) => ({
        id: article.uri,
        source: article.source.title,
        author: article.author?.name,
        title: article.title,
        description: article.body,
        url: article.url,
        imageUrl: article.image,
        date: article.date,
      }));

      const nyTimesData: Article[] = nyTimesResponse.response.docs.map((article: any) => ({
        id: article._id,
        source: article.source,
        title: article.headline.main,
        description: article.lead_paragraph,
        url: article.web_url,
        imageUrl: `https://www.nytimes.com/${article?.multimedia[0]?.url}`,
        date: article.pub_date,
      }));

      const newsApiDataMapped: Article[] = newsApiResponse.articles.map((article: any) => ({
        id: article.source.id,
        source: article.source.name,
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        imageUrl: article.urlToImage,
        date: article.publishedAt,
      }));

      return [...newsApiData, ...nyTimesData, ...newsApiDataMapped];
    },{
        enabled:!!keyword,
        staleTime:Infinity,

    }
  );

  return { queryResults, isLoading, isError };
};
