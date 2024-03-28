import axios from 'axios';
import { useQuery } from 'react-query';


export interface GuardianApiResponse {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
  } 

  export const useGuardianApiQuery = (query: string, category: string, fromDate: string) => {
    return useQuery(['guardianApiData', query, category, fromDate], async () => {
      const response = await axios.get('https://content.guardianapis.com/search', {
        params: {
          q: query,
          'from-date': fromDate,
          'page-size': 20,
          'api-key': "YOUR_API_KEY",
          section: category,
        },
      });
      return response.data.response.results.map((result: any) => ({
        id: result.id,
        type: result.type,
        sectionId: result.sectionId,
        sectionName: result.sectionName,
        webPublicationDate: result.webPublicationDate,
        webTitle: result.webTitle,
        webUrl: result.webUrl,
        apiUrl: result.apiUrl,
        isHosted: result.isHosted,
        pillarId: result.pillarId,
        pillarName: result.pillarName,
      }));
    }, {
      onError: (error) => {
        console.error('Error fetching data from Guardian API:', error);
      },
    });
  };
