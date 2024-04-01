import React from 'react';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import {HomePage}  from './pages';
import ErrorBoundary from './hoc/ErrorBoundry';
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<h1> Something went wrong...</h1>}>
      <HomePage />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
