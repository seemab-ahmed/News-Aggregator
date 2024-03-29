import React, { useState, useMemo } from "react";
import { NewsApiResponse } from "../../queries/newsApiQuery";
import { NewsCard } from "../../components/newsCard/newsCard";
import Loading from "../../components/Loading/loading";
import useCombineQuery from "../../queries/combineQuery";
import { searchNewsAtom } from "../../atoms/searchNewsAtom";
import { useRecoilState } from "recoil";
import Pagination from "../../components/pagination/pagination";

interface NewsProps {}

const News: React.FC<NewsProps> = () => {
  const { data: queryResults, isLoading } = useCombineQuery();
  const [, setNewsSearch] = useRecoilState(searchNewsAtom);
  const [selectedSource, setSelectedSource] = useState<string>('');

  const getAllSources = (articles: any): string[] => {
    const sourcesSet = new Set<string>();
    articles.forEach((article: any) => {
      if (article.source && article.source.trim() !== '') {
        sourcesSet.add(article.source.trim());
      }
    });
    return Array.from(sourcesSet);
  };

  const filterArticlesBySource = (articles: any, sourceName: string): NewsApiResponse[] => {
    return sourceName ? articles.filter((article: NewsApiResponse) => article.source === sourceName) : articles;
  };

  const handleSelectSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sourceName = event.target.value;
    setSelectedSource(sourceName);
    setNewsSearch(prevNewsSearch => ({ ...prevNewsSearch, source: sourceName }));
  };

  const newsSource = useMemo(() => getAllSources(queryResults), [queryResults]);

  const filteredArticles = useMemo(() => filterArticlesBySource(queryResults, selectedSource), [queryResults, selectedSource]);

  const renderArticles = () => {
    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <div className="flex flex-col flex-wrap md:flex-row md:-mx-2 gap-y-2">
          {filteredArticles.length ? filteredArticles.map((article: NewsApiResponse, index: number) => (
            <NewsCard
              title={article.title}
              description={article.description}
              imageUrl={article.imageUrl}
              url={article.url}
              key={index}
            />
          )) :
            <div className="text-gray-500 font-semibold flex justify-center w-full">
              <p className="p-5 text-4xl">No Record Found</p>
            </div>}
        </div>
      );
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-6 pb-4">
      <div className="flex justify-end w-full pb-4 gap-4">
        <select value={selectedSource} onChange={handleSelectSource} className="p-2 bg-white border border-gray-400 rounded-lg w-[250px] outline-none text-sm ">
          <option value="">Select Source</option>
          {newsSource.map((source, index) => <option value={source} key={index} className="">{source}</option>)}
        </select>
        <Pagination />
      </div>
      {renderArticles()}
    </div>
  );
};

export default News;
