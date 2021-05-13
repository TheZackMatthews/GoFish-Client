import React, { useState } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Paragraph, TextInput } from 'react-native-paper';
import BackNext from '../../components/questions/BackNext';
import styles from '../../styles/QuestionStyles';
// import OneAnswer from '../../components/questions/OneAnswer';
import TwoAnswer from '../../components/questions/TwoAnswer';

const Redd1 = ({ navigation }) => {
  const [numberInput, setNumberInput] = useState(0);
  const question = 'Is a fish guarding the redd?';
  const answer1 = 'Yes';
  const answer2 = 'No';

  const navigationHandler = (direction) => {
    if (direction === 'back') {
      navigation.navigate('FishOrRedd');
    } else if (numberInput !== 0) {
      navigation.navigate('Redd2');
    } else {
      alert('Please enter amount!');
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Paragraph>How many?</Paragraph>
      <TextInput
        // value={form.total.toString()}
        keyboardType="numeric"
        onChangeText={(number) => setNumberInput(number)}
      />
      <TwoAnswer
        question={question}
        answer1={answer1}
        answer2={answer2}
        choose={setNumberInput}
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
