import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

let store;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage || storage,
  blacklist: ['user', 'theme'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

function initStore(initialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}

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
  const persistor = persistStore(store);
  return { store, persistor };
}
