import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const REFETCH_INTERVAL = 1000 * 20  // 5 minutes

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: REFETCH_INTERVAL,
      refetchOnReconnect: false,
      
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

        <BrowserRouter>
          <App />

        </BrowserRouter>
    </QueryClientProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
