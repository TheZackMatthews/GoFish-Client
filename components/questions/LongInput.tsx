import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { IQuestion } from '../../interfaces/flow';
import { DefaultRootState } from '../../interfaces/state';
import { updatePin } from '../../redux/actions/surveyActions';

interface Props {
  question: IQuestion,
  validate: (i: number) => void,
  i: number,
}

const LongInput = ({ question, validate, i }: Props) => {
  const dispatch = useDispatch();
  const pin = useSelector((state: DefaultRootState) => state.pin);
  const [input, setInput] = useState<string>('');

  const changeHandler = (text: string): void => {
    validate(i);
    setInput(text);
    if (question.data) {
      dispatch(updatePin({
        ...pin,
        [question.data]: text,
      }))
    }
  }

  return (
  <View>
    <TextInput
      multiline
      textAlignVertical="top"
      value={input}
      onChangeText={(text) => changeHandler(text)}
    />
  </View>
)};

export default LongInput;
