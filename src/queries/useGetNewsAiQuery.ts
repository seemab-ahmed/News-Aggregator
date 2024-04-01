import { useQuery } from "react-query";
import { searchNewsAtom } from "../atoms/searchNewsAtom";
import { useRecoilValue } from "recoil";
import { service } from "../service";
import { NewsApiResponse } from "../type";

export const mapGetNewsAiQueryData = ({
  // author: { name },
  body,
  date,
  image,
  source: { title: sourceTitle },
  title,
  uri,
  url,
}: NewsApiResponse) => ({
  id: uri,
  source: sourceTitle,

  // author: name,
  title: title,
  description: body,
  url: url,
  imageUrl: image,
  date: date,
});

const getNewsApi = async ({ params }: { params: any }) => {
  const { data } = await service.get(
    `${process.env.REACT_APP_NEWS_API_AI_URL}`,
    {
      params,
    }
  );
  return data;
};
export const useGetNewsAiQuery = () => {
  const { keyword, fromDate, pageNumber } = useRecoilValue(searchNewsAtom);

  return useQuery(
    ["newsApiData", keyword, fromDate, pageNumber],
    async () => {
      const response = await getNewsApi({
        params: {
          action: "getArticles",
          keyword: keyword,
          articlesPage: pageNumber,
          articlesCount: 60,
          articlesSortBy: "date",
          articlesSortByAsc: false,
          articlesArticleBodyLen: -1,
          resultType: "articles",
          dataType: ["news", "pr"],
          apiKey: process.env.REACT_APP_NEWS_API_AI_KEY,
          forceMaxDataTimeWindow: 31,
        },
      });

      console.log(response?.articles.results);
      const data =
        response?.articles?.data.results?.map(mapGetNewsAiQueryData);
      return data;
    },
    {
      enabled: !!keyword,
      staleTime: Infinity,
      onError: (error) => {
        console.error("Error fetching data from News API:", error);
      },
    }
  );
};
