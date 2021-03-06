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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  SearchBox: {
    width: 100,
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
