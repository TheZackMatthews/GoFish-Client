import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from "../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  bodyContainer: {
    alignItems: 'flex-start',
    margin: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
  }
})


