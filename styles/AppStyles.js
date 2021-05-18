import { StyleSheet } from 'react-native';
import { SIZES, FONTS } from '../constants/theme';

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
