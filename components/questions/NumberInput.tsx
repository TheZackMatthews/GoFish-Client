import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { updatePin } from '../../redux/actions/surveyActions';
import { DefaultRootState } from '../../interfaces/state';
import { IQuestion } from '../../interfaces/flow';

interface Props {
  question: IQuestion,
  answer: string,
  setAnswer: React.Dispatch<React.SetStateAction<string>>,
}

const NumberInput = ({ question, answer, setAnswer }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const pin = useSelector((state: DefaultRootState) => state.pin);

  const changeHandler = (number: string) => {
    setAnswer(number);
    if (question.data) {
      dispatch(updatePin({
        ...pin,
        [question.data]: answer,
      }));
    }
  };
  return (
    <View>
      <TextInput
        keyboardType="numeric"
        value={answer}
        onChangeText={(number) => changeHandler(number)}
      />
    </View>
  );
};

export default NumberInput;
