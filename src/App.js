import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Home from './pages/Home';
import WatchList from './pages/WatchList';
import Search from './pages/Search';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { GlobalProvider } from './context/GlobalState';
import useDebounce from './utils/useDebounce';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // custom hook to delay search term state update - minimising fetch calls
  const debouncedTerm = useDebounce(searchTerm, 750);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <ScrollToTop />
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/watchlist' element={<WatchList />} />
            <Route path='/search' element={<Search debouncedTerm={debouncedTerm} />} />
          </Routes>
          <Footer />
          <Toaster
            position='bottom-center'
            toastOptions={{
              duration: 3000,
              style: {
                background: '#ddd',
                color: '#333',
                fontWeight: '500',
                fontSize: '14px',
              },
            }}
          />
          <GlobalStyle />
        </GlobalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: #111;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;
