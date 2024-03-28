import axios from 'axios';
import { useQuery } from 'react-query';
import { searchNewsAtom } from '../atoms/searchNewsAtom';
import { useRecoilValue } from 'recoil';

export interface NewsAiResponse {  
  id?: string | null;
  source?: string | null;
  author?: string | null;
  title: string;
  description: string;
  url?: string;
  imageUrl: string;
  date?: string;
}

const mapArticleData = (article: any): NewsAiResponse => ({
  id: article.uri,
  source: article.source.title,
  author: article.author?.name,
  title: article.title,
  description: article.body,
  url: article.url,
  imageUrl: article.image,
  date: article.date,
});

export const useNewsAiQuery = () => {
  const { keyword, fromDate } = useRecoilValue(searchNewsAtom);

  return useQuery(['newsApiData', keyword, fromDate], async () => {
    const response = await axios.get(`${process.env.REACT_APP_NEWS_API_AI_URL}`, {
      params: {
        "action": "getArticles",
        "keyword": keyword,
        "articlesPage": 1,
        "articlesCount": 6,
        "articlesSortBy": "date",
        "articlesSortByAsc": false,
        "articlesArticleBodyLen": -1,
        "resultType": "articles",
        "dataType": [
          "news",
          "pr"
        ],
        "apiKey": process.env.REACT_APP_NEWS_API_AI_KEY,
        "forceMaxDataTimeWindow": 31
      },
    });
    return response.data.articles.results?.map(mapArticleData);
  }, {
    enabled: !!keyword,
    staleTime: Infinity,
    onError: (error) => {
      console.error('Error fetching data from News API:', error);
    },
  });
};
