import { Platform } from 'react-native';

const fontConfig = {
  web: {
    regular: {
      regular: {
        fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: '500',
      },
      light: {
        fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: '300',
      },
      thin: {
        fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: '100',
      },
    },
  },
  ios: {
    regular: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      light: {
        fontFamily: 'System',
        fontWeight: '300',
      },
      thin: {
        fontFamily: 'System',
        fontWeight: '100',
      },
    },
  },
  default: {
    regular: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    },
    large: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
        fontSize: 20,
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
        fontSize: 20,
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
        fontSize: 20,
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
        fontSize: 20,
      },
    },
  },
};

export default function configureFonts(size) {
  const fonts = Platform.select({ ...fontConfig });
  const sizeFonts = fonts[size];
  return sizeFonts;
}
