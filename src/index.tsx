import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components'
import { lightTheme } from './theme';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Create a client
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* Provide the client to your App */}
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
      <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
