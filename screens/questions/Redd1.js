import React, { useState } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updatePin } from '../../redux/actions/surveyActions';
import BackNext from '../../components/questions/BackNext';
import styles from '../../styles/QuestionStyles';
import TwoAnswer from '../../components/questions/TwoAnswer';

const Redd1 = ({ navigation }) => {
  const [selected, setSelected] = useState('');
  const pin = useSelector((state) => state.pin);
  const dispatch = useDispatch();
  const question = 'Is a fish guarding the redd?';
  const answer1 = 'Yes';
  const answer2 = 'No';

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('FishOrRedd');
    } else if (selected === answer1) {
      navigation.navigate('Redd2');
    } else if (selected === answer2) {
      await dispatch(updatePin({
        ...pin,
        fish_species: 'unknown',
      }));
      navigation.navigate('Notes');
    } else {
      Alert.alert('Please answer yes or no!');
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <TwoAnswer
        question={question}
        answer1={answer1}
        answer2={answer2}
        choose={setSelected}
      />
      <BackNext navigationHandler={(direction) => navigationHandler(direction)} />
    </KeyboardAvoidingView>
  );
};

Redd1.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Redd1.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default Redd1;
