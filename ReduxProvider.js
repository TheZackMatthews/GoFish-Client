import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { useStore } from './redux/store';
import configureFonts from './constants/fonts';

export default function ReduxProvider({ children }) {
  const { store, persistor } = useStore({});
  
  const theme = {
    ...DefaultTheme,
    dark: false,
    roundness: 4,
    colors: {
      primary: '#FF5733',
      accent: '#03dac4',
      background: '#ffffff',
      surface: 'white',
      error: '#B00020',
      text: 'black',
      onSurface: '#000000',
      notification: 'pink',
    },
    // fonts: configureFonts('regular'),
    animation: {
      scale: 1.0,
    },
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          {children}
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
