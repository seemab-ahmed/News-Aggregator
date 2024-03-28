import axios from 'axios';
import { useQuery } from 'react-query';
import { searchNewsAtom } from '../atoms/searchNewsAtom';
import { useRecoilValue } from 'recoil';
export interface NewsApiResponse {
    source?: {
      id: string | null;
      name: string | null;
    };
    author?: string | null;
    title: string;
    description: string;
    url?: string;
    urlToImage: string;
    publishedAt?: string;
    content?: string;
  }

  
  export const useNewsApiQuery = () => {
    const { keyword, fromDate } = useRecoilValue(searchNewsAtom);
    return useQuery(['newsApiData', keyword, fromDate], async () => {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: keyword,
          from: fromDate,
          sortBy: 'publishedAt',
          pageSize: 6,
          page:1,
          apiKey: 'f506e31bf7ee43b281f016338e97580c',
        },
      });
      return response.data.articles.map((article: any) => ({
        id: article.source.id,
        source: article.source.name,
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        content: article.content,
      }));
    }, {
        enabled: !!keyword,
      onError: (error) => {
        console.error('Error fetching data from News API:', error);
      },
    });
  };