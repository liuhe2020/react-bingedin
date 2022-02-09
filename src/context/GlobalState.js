import { createContext, useReducer, useEffect } from 'react';

// initial state for watch list
const initialState = {
  watchlist: localStorage.getItem('watchlist')
    ? JSON.parse(localStorage.getItem('watchlist'))
    : [],
};

// create context
const GlobalContext = createContext(initialState);

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_WATCH_LIST':
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    case 'REMOVE_WATCH_LIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

// provider component
const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // actions
  const addWatchList = (movie) => {
    dispatch({ type: 'ADD_WATCH_LIST', payload: movie });
  };

  const removeWatchList = (id) => {
    dispatch({ type: 'REMOVE_WATCH_LIST', payload: id });
  };

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
  }, [state]);

  return (
    <GlobalContext.Provider
      value={{ watchlist: state.watchlist, addWatchList, removeWatchList }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider };

export { GlobalContext };
