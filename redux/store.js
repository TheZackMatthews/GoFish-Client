import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

let store;

function initStore(initialState) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}

// const composeEnhancers = typeof window === 'object'
//   && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//     // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//   }) : compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(thunkMiddleware),
//   // other store enhancers if any
// );

// const initStore = (initialState) => createStore(reducers, initialState, enhancer);

export const initializeStore = (preloadedState) => {
  // eslint-disable-next-line no-underscore-dangle
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });

    store = undefined;
  }

  if (typeof window === 'undefined') return _store;

  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  store = useMemo(() => initializeStore(initialState, [initialState]));
  return store;
}
