import { useQuery } from 'react-query';
import { searchNewsAtom } from '../atoms/searchNewsAtom';
import { useRecoilValue } from 'recoil';
import { NewsResponseInterface } from '../type';
import { service } from '../service';

export const mapNyTimesApiQueryData = (article: any): NewsResponseInterface => ({
  id: article._id,
  source: article.source,
  title: article.headline.main,
  description: article.lead_paragraph,
  url: article.web_url,
  imageUrl: "https://www.nytimes.com/" + article.multimedia[0].url,
  date: article.pub_date,
});

const getNewsApi = async ({ params }: { params: any }) => {
  const { data } = await service.get(
    `${process.env.REACT_APP_NYTIMES_API_URL}`,
    {
      params,
    }
  );
  return data;
};

export const useNyTimesApiQuery = () => {
  const { keyword, fromDate } = useRecoilValue(searchNewsAtom);

  return useQuery(['nyTimesApiData', keyword, fromDate], async () => {
    const response = await getNewsApi({
      params: {
        q: keyword,
        begin_date: fromDate,
        page: 1,
        sort: 'newest',
        "api-key": process.env.REACT_APP_NYTIMES_API_KEY,
      }
    });
    return response.data.response.docs.map(mapNyTimesApiQueryData);
  }, {
    enabled: !!keyword,
    staleTime: Infinity,
    onError: (error) => {
      console.error('Error fetching data from New York Times API:', error);
    },
  });
};
