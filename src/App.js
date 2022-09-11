import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Home from './pages/Home';
import WatchList from './pages/WatchList';
import Search from './pages/Search';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { GlobalProvider } from './context/GlobalState';

export default function App() {
  // states to be passed in to Header & Search components
  const [term, setTerm] = useState('');
  const [submitTerm, setSubmitTerm] = useState('');
  const [page, setPage] = useState(1);

  return (
    <GlobalProvider>
      <Router>
        <>
          <ScrollToTop />
          <Header
            term={term}
            setTerm={setTerm}
            submitTerm={submitTerm}
            setSubmitTerm={setSubmitTerm}
            setPage={setPage}
          />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/watchlist' component={WatchList} />
            <Route>
              <Search
                path='/search'
                submitTerm={submitTerm}
                page={page}
                setPage={setPage}
              />
            </Route>
          </Switch>
          <Footer />
          <GlobalStyle />
        </>
      </Router>
    </GlobalProvider>
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
