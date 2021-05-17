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
  SearchBoxCompleted: {
    backgroundColor: '#f6f6f6',
    borderColor: 'green',
    opacity: 0.5,
  },
  SearchBoxUncomplete: {
    backgroundColor: '#f6f6f6',
    opacity: 0.5,
  },
  SearchBoxTextItem: {
    margin: 5,
    fontSize: 16,
    paddingTop: 4,
    opacity: 0.6,
  },
});

export default styles;
