import React from 'react';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { HomePage } from './pages/homePage/homePage';
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
}

export default App;
