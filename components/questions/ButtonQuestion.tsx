import React, { useState } from 'react'
import { Button, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { IAnswer, IQuestion } from '../../interfaces/flow'
import { DefaultRootState } from '../../interfaces/state';
import { updatePin } from '../../redux/actions/surveyActions'

interface Props {
  question: IQuestion
  validate: (i: number) => void,
  i: number,
  setAnswer: any,
}

const ButtonQuestion = ({ question, validate, i, setAnswer}: Props): JSX.Element => {
  const [buttonAns, setButtonAns] = useState<IAnswer | undefined>(undefined);
  const theme = useTheme();
  const dispatch = useDispatch();
  const pin = useSelector((state: DefaultRootState) => state.pin);

  const clickHandler = (answer: IAnswer) => {
    setButtonAns(answer);
    if (answer.data) {
      dispatch(updatePin({
        ...pin,
        [answer.data]: answer.value,
      }))
    }
    validate(i);
    if (setAnswer) {
      setAnswer(answer);
    }
  }

  const renderButtons = () => (question.answers ? (question.answers.map((answer) => (
    <Button
      key={answer.uid}
      mode="contained"
      style={styleRender(answer)}
      onPress={() => clickHandler(answer)}
    >
      {answer.label}
    </Button>
  ))) : (<></>));
  const styleRender = (answerObject: IAnswer) => {
    if (buttonAns && answerObject.label === buttonAns.label) {
      return {
        marginHorizontal: 5,
        marginVertical: 10,
        backgroundColor: theme.colors.lightBlue,
      };
    }
    return {
      marginHorizontal: 5,
      marginVertical: 10,
    };
  };

  return (<>{renderButtons()}</>)
}

export default ButtonQuestion
