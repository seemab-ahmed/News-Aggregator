import axios from 'axios';
import { useQuery } from 'react-query';

export interface NewsAiResponse {
    source?: {
      id: string | null;
      name: string | null;
    };
    author?: string | null;
    title: string;
    description: string;
    url?: string;
    image: string;
    date?: string;
  }

  export interface NewsQueryType {
    keyword: string,
    fromDate: string,
  }
  export const useNewsAiQuery = ({keyword, fromDate = "2024-02-28"} : NewsQueryType) => {
    return useQuery(['newsApiData', keyword, fromDate], async () => {
        const APIKey = "26663f42-c78e-439f-a34c-4fec9a34d3a6";
      const response = await axios.get('http://eventregistry.org/api/v1/article/getArticles', {
        params: {
            "action": "getArticles",
            "keyword": keyword,
            "articlesPage": 1,
            "articlesCount": 10,
            "articlesSortBy": "date",
            "articlesSortByAsc": false,
            "articlesArticleBodyLen": -1,
            "resultType": "articles",
            "dataType": [
              "news",
              "pr"
            ],
            "apiKey": APIKey,
            "forceMaxDataTimeWindow": 31
        },
      });
      console.log(response.data.articles.results);
      return response.data.articles.results?.map((article: any) => ({
        id: article.uri,
        source: {
            id: article.source.uri,
            name: article.source.title
        },
        author: article.author?.name,
        title: article.title,
        description: article.body,
        url: article.url,
        image: article.image,
        date: article.date,
      }));
    }, {
      onError: (error) => {
        console.error('Error fetching data from News API:', error);
      },
    });
  };