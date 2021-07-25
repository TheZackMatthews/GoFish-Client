import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { updatePin } from '../../redux/actions/surveyActions';
import { DefaultRootState } from '../../interfaces/state';
import { IQuestion } from '../../interfaces/flow';

interface Props {
  question: IQuestion,
  validate: (i: number) => void,
  i: number,
}

// There is no 'setAnswer' from the parent because there is no conditional
// rendering of the next page based on a number input.
const NumberInput = ({ question, validate, i }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const pin = useSelector((state: DefaultRootState) => state.pin);
  const [input, setInput] = useState<string>('0');

  const changeHandler = (number: string) => {
    validate(i);
    if (question.data) {
      dispatch(updatePin({
        ...pin,
        [question.data]: number,
      }));
    }
    setInput(number);
  };
  return (
    <View>
      <TextInput
        keyboardType="numeric"
        value={input}
        onChangeText={(number) => changeHandler(number)}
      />
    </View>
  );
};

export default NumberInput;
