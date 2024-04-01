
import axios from 'axios';

const config = {
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
};

const service = axios.create(config);
service.interceptors.request.use(function (config) {
  return config;
});
export { service };


// // Function to create axios instance with dynamic base URL
// const createService = (baseURL:string) => {
//   const config = {
//     baseURL,
//     headers: {
//       accept: 'application/json',
//       'content-type': 'application/json',
//     },
//   };
  
//   // Create and return axios instance
//   return axios.create(config);
// };

// // Example usage:
// const newsApiUrl = process.env.REACT_APP_NEWS_API_URL;
// const nyTimesApiUrl = process.env.REACT_APP_NYTIMES_API_URL;
// const newsApiAiUrl = process.env.REACT_APP_NEWS_API_AI_URL;

// const newsApiService = createService(newsApiUrl ?? '');
// const nyTimesApiService = createService(nyTimesApiUrl ?? '');
// const newsApiAiService = createService(newsApiAiUrl ?? '');

// export { newsApiService, nyTimesApiService, newsApiAiService };

