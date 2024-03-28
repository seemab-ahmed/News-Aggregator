import axios from 'axios';
import { useQuery } from 'react-query';
import { searchNewsAtom } from '../atoms/searchNewsAtom';
import { useRecoilValue } from 'recoil';

export interface NewsApiResponse {
  id?: string | null;
  source?: string | null;
  title: string;
  description: string;
  url?: string;
  imageUrl: string;
  publishedAt?: string;
}

const mapArticleData = (article: any): NewsApiResponse => ({
  id: article._id,
  source: article.source,
  title: article.headline.main,
  description: article.lead_paragraph,
  url: article.web_url,
  imageUrl: "https://www.nytimes.com/" + article.multimedia[0].url,
  publishedAt: article.pub_date,
});

export const useNyTimesApiQuery = () => {
  const { keyword, fromDate } = useRecoilValue(searchNewsAtom);

  return useQuery(['nyTimesApiData', keyword, fromDate], async () => {
    const response = await axios.get(`${process.env.REACT_APP_NYTIMES_API_URL}`, {
      params: {
        q: keyword,
        begin_date: fromDate,
        page: 1,
        sort: 'newest',
        "api-key": process.env.REACT_APP_NYTIMES_API_KEY,
      },
    });
    return response.data.response.docs.map(mapArticleData);
  }, {
    enabled: !!keyword,
    staleTime: Infinity,
    onError: (error) => {
      console.error('Error fetching data from New York Times API:', error);
    },
  });
};
