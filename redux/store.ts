import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import { DefaultRootState } from '../interfaces/state';
let store: any;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


const persistConfig = {
  key: 'root',
  storage: AsyncStorage || storage,
  blacklist: ['user', 'theme'],
};

const logger = createLogger({
  collapsed: true,
  level: {
    prevState: false,
    nextState: false,
    error: false,
  },
});

const persistedReducer = persistReducer(persistConfig, reducers);

const initStore = (initialState: DefaultRootState) => {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, logger)),
  );
}

export const initializeStore = (preloadedState: DefaultRootState) => {
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

export function useStore(initialState: DefaultRootState) {
  store = useMemo<any>(() => initializeStore(initialState), [initialState]);
  const persistor = persistStore(store);
  return { store, persistor };
}
