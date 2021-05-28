import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

const LongInput = ({ answer, setAnswer }) => (
  <View>
    <TextInput
      required
      multiline
      value={answer}
      onChangeText={(text) => setAnswer(text)}
    />
  </View>
);

LongInput.propTypes = {
  question: PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.shape(
      {
        value: PropTypes.string,
        label: PropTypes.string,
      },
    )),
  }),
  answer: PropTypes.number || PropTypes.bool,
  setAnswer: PropTypes.func,
};

LongInput.defaultProps = {
  question: {
    label: '',
    type: '',
    data: '',
    answers: [
      {
        value: '',
        label: '',
      },
    ],
  },
  answer: 0,
  setAnswer: () => null,
};

export default LongInput;
