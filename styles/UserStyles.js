import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headContainer: {
    alignItems: 'center',
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
  },
  input: {
    margin: 5,
    width: 350,
  },
  SearchBoxTextItem: {
    margin: 5,
    fontSize: 16,
    paddingTop: 4,
  },
});

export default styles;
