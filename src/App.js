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
import { QueryClient, QueryClientProvider } from 'react-query';
import useDebounce from './utils/useDebounce';

const queryClient = new QueryClient();

export default function App() {
  // states to be passed in to Header & Search components
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  // custom hook to delay search term state update - minimising fetch calls
  const debouncedTerm = useDebounce(searchTerm, 1000);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <ScrollToTop />
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} setPage={setPage} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/watchlist' element={<WatchList />} />
            <Route path='/search' element={<Search debouncedTerm={debouncedTerm} page={page} setPage={setPage} />} />
          </Routes>
          <Footer />
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
