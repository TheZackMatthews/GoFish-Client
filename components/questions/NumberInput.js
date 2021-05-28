import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { updatePin } from '../../redux/actions/surveyActions';

const NumberInput = ({ question, answer, setAnswer }) => {
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pin);

  const changeHandler = (number) => {
    setAnswer(number);
    dispatch(updatePin({
      ...pin,
      [question.data]: answer,
    }));
  };

  return (
    <View>
      <TextInput
        required
        keyboardType="numeric"
        value={answer || '0'}
        onChangeText={(number) => changeHandler(number)}
      />
    </View>
  );
};

NumberInput.propTypes = {
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

NumberInput.defaultProps = {
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

export default NumberInput;
