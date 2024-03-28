import axios from 'axios';
import { useQuery } from 'react-query';
import { searchNewsAtom } from '../atoms/searchNewsAtom';
import { useRecoilValue } from 'recoil';

export interface NewsApiResponse {
 id?: string | null;
 source?: string | null;
  author?: string | null;
  title: string;
  description: string;
  url?: string;
  imageUrl: string;
  date?: string;
}

const mapArticleData = (article: any): NewsApiResponse => ({
  id: article.source.id,
  source: article.source.name,
  author: article.author,
  title: article.title,
  description: article.description,
  url: article.url,
  imageUrl: article.urlToImage,
  date: article.publishedAt,
});

export const useNewsApiQuery = () => {
  const { keyword, fromDate } = useRecoilValue(searchNewsAtom);

  return useQuery(['newsApiData', keyword, fromDate], async () => {
    const response = await axios.get(`${process.env.REACT_APP_NEWS_API_URL}`, {
      params: {
        q: keyword,
        from: fromDate,
        sortBy: 'publishedAt',
        pageSize: 6,
        page: 1,
        apiKey: process.env.REACT_APP_NEWS_API_KEY,
      },
    });
    return response.data.articles.map(mapArticleData);
  }, {
    enabled: !!keyword,
    staleTime: Infinity,
    onError: (error) => {
      console.error('Error fetching data from News API:', error);
    },
  });
};
