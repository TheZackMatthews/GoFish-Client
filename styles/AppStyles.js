import { DefaultTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { SIZES, FONTS, COLORS } from '../constants/theme';

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export const prefStyles = StyleSheet.create({
  container: {
    margin: 30,
  },
  title: {
    alignSelf: 'center',
  },
  fontLarge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    width: SIZES.width / 2,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export const refStyles = StyleSheet.create({
  header: {
    ...FONTS.h1,
    marginTop: SIZES.padding * 5, // I couldnt change space in btwn
  },
  constainer: {
    flex: 1,
  },
  img: {
    height: '100%',
    width: '100%',
  },
});

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.sMedBlue,
    accent: COLORS.sDarkGreen,
    light: COLORS.sPerwinkle,
    backdrop: 'rgba(0, 0, 0, 0.5)',
    background: '#f6f6f6',
    disabled: 'rgba(0, 0, 0, 0.26)',
    error: '#B00020',
    notification: '#f50057',
    onSurface: '#000000',
    placeholder: 'rgba(0, 0, 0, 0.54)',
    surface: '#ffffff',
    text: '#000000',
  },
};
