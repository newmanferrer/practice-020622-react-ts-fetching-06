import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { UserToEditProvider } from './contexts';
import { App } from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true
    }
  }
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <UserToEditProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={true} />
        </UserToEditProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
