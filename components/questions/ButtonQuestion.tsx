import React from 'react'
import { Button, useTheme } from 'react-native-paper';
import { IAnswer, IQuestion } from '../../interfaces/flow'

interface Props {
  question: IQuestion
}

const ButtonQuestion = ({ question }: Props) => {
  const [buttonAns, setButtonAns] = React.useState<IAnswer | undefined>(undefined);
  const theme = useTheme();

  const renderButtons = () => question.answers && question.answers.map((answer) => (
    <Button
    key={answer.uid}
    mode="contained"
    style={styleRender(answer)}
    onPress={() => clickHandler(answer)}
  >
    {answer.label}
  </Button>
  ));
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

  const clickHandler = (answer: IAnswer) => {
    setButtonAns(answer);
  }
  console.log(buttonAns)
  return renderButtons()
}

export default ButtonQuestion
