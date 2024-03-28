import React from "react";
import { useNewsApiQuery, NewsApiResponse } from "../../queries/newsApiQuery";
import { NewsCard } from "../../components/newsCard/newsCard";
import Loading from "../../components/Loading/loading";
// import { useNewsAiQuery  } from "../../queries/newsAiQuery";

const News = () => {
  const { data: articles, isLoading } = useNewsApiQuery();
  // const keyword = "News"
  // const fromDate = "2024-2-28";
  // const { data:newArticle } = useNewsAiQuery({keyword, fromDate});

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-16 pb-4">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col flex-wrap md:flex-row md:-mx-2 gap-y-2">
          {articles?.map((article: NewsApiResponse, index: number) => (
            <NewsCard
              title={article.title}
              description={article.description}
              urlToImage={article.urlToImage}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
