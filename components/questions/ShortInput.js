import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

const ShortInput = ({ answer, setAnswer }) => (
  <View>
    <TextInput
      value={answer}
      onChangeText={(text) => setAnswer(text)}
    />
  </View>
);

ShortInput.propTypes = {
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
  answer: PropTypes.string,
  setAnswer: PropTypes.func,
};

ShortInput.defaultProps = {
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
  answer: '',
  setAnswer: () => null,
};

export default ShortInput;
