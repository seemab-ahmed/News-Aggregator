import { NewsApiResponse } from './newsApiQuery';
import { GuardianApiResponse } from './guardianApiQuery';

interface CombinedData {
  id: string | null | undefined;
  source: string | undefined | null;
  author: string | null | undefined;
  title: string;
  description: string;
  url: string | undefined;
  urlToImage: string;
  publishedAt: string | undefined;
  content: string | null | undefined;
}

export const combineData = (newsData: NewsApiResponse[], guardianData: GuardianApiResponse[]): CombinedData[] => {
  const combinedData: CombinedData[] = [];

  
  newsData.forEach((article) => {
    combinedData.push({
      id: article.source?.id,
      source: article.source?.name,
      author: article.author,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      content: article.content,
    });
  });

  guardianData.forEach((result) => {
    combinedData.push({
      id: result.id,
      source: result.sectionName, 
      author: null, 
      title: result.webTitle,
      description: '', 
      url: result.webUrl,
      urlToImage: '', 
      publishedAt: result.webPublicationDate,
      content: null, 
    });
  });

  return combinedData;
};
