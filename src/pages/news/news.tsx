import React from "react";
import { NewsApiResponse } from "../../queries/newsApiQuery";
import { NewsCard } from "../../components/newsCard/newsCard";
import Loading from "../../components/Loading/loading";
import useCombineQuery from "../../queries/combineQuery";

const News = () => {
  const { data: articles, isLoading } = useCombineQuery();

  const renderArticles = () => {
    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <div className="flex flex-col flex-wrap md:flex-row md:-mx-2 gap-y-2">
          {articles?.map((article: NewsApiResponse, index: number) => (
            <NewsCard
              title={article.title}
              description={article.description}
              imageUrl={article.imageUrl}
              key={index}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-16 pb-4">
      {renderArticles()}
    </div>
  );
};

export default News;
