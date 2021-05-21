import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
  },
  SearchBox: {
    paddingHorizontal: 0,
    left: -10,
    width: 333,
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
  autoCompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});

export default styles;
