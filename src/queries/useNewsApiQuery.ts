import { useQuery } from 'react-query';
import { searchNewsAtom } from '../atoms/searchNewsAtom';
import { useRecoilValue } from 'recoil';
import { NewsResponseInterface } from '../type';
import { service } from '../service';

export const mapGetNewsAPiQueryData = (article: any): NewsResponseInterface => ({
  id: article.source.id,
  source: article.source.name,
  author: article.author,
  title: article.title,
  description: article.description,
  url: article.url,
  imageUrl: article.urlToImage,
  date: article.publishedAt,
});


const getNewsApi = async ({ params }: { params: any }) => {
  const { data } = await service.get(
    `${process.env.REACT_APP_NEWS_API_URL}`,
    {
      params,
    }
  );
  return data;
};
export const useNewsApiQuery = () => {
  const { keyword, fromDate } = useRecoilValue(searchNewsAtom);

  return useQuery(['newsApiData', keyword, fromDate], async () => {
    const response = await getNewsApi({
      params: {
        q: keyword,
        from: fromDate,
        sortBy: 'publishedAt',
        pageSize: 6,
        page: 1,
        apiKey: process.env.REACT_APP_NEWS_API_KEY,
      },
    })
    console.log(response);
    return response?.articles.map(mapGetNewsAPiQueryData);
  }, {
    enabled: !!keyword,
    staleTime: Infinity,
    onError: (error) => {
      console.error('Error fetching data from News API:', error);
    },
  });
};
