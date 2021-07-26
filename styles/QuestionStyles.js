import { StyleSheet } from 'react-native';
import { SIZES } from '../constants/Theme';

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
  surface: {
    width: SIZES.width * 0.8,
    height: SIZES.height * 0.8,
    padding: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default styles;
