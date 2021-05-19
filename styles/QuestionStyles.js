import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    marginHorizontal: 30,
    marginBottom: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  answerContainer: {
    flex: 1,
    margin: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  btnContainer: {
    margin: 20,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  questionContainer: {
    margin: 100,
  },
  notesContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

export default styles;
