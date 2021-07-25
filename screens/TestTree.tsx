import React, { useState } from 'react';
import {
  Title, Button, Card, useTheme,
} from 'react-native-paper';
import { Text, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDown from '../components/questions/DropDown';
import ButtonQuestion from '../components/questions/ButtonQuestion';
import NumberInput from '../components/questions/NumberInput';
import LongInput from '../components/questions/LongInput';
import ShortInput from '../components/questions/ShortInput';
import questionnaire from '../constants/FishFlow';
import { DefaultRootState } from '../interfaces/state';
import { IAnswer } from '../interfaces/flow';

interface Props {
  navigation: {
    navigate: (page: string) => null;
    goBack: () => null;
  }
}

const TestTree = ({ navigation }: Props) => {
  const [question, setQuestion] = useState(questionnaire.start);
  const [answer, setAnswer] = useState<IAnswer | undefined>(undefined);
  const theme = useTheme();
  const pin = useSelector((state: DefaultRootState) => state.pin);
  const dispatch = useDispatch();

  console.log(question);

  const validate = (i: number) => {
    const newValidate = question.validation;
    newValidate[i] = true;
    setQuestion({
      ...question,
      validation: newValidate,
    })
  }

  const navigationHandler = async () => {
    if (question.validation.includes(false)) {
      Alert.alert('Alert!', 'Please select an option for each question.')
    } else {
      if (question.next) setQuestion(question.next);
      else if (answer !== undefined && answer.next) setQuestion(answer.next)
    }
  };

  const backHandler = () => {
    if (question.prev) setQuestion(questionnaire.questionPages[question.prev]);
    else {
      try {
        navigation.goBack();
      } catch (error) {
        navigation.navigate('Profile');
      }
    }
  };

  const renderAnswers = (oneQuestion: any, i: number): JSX.Element => {
    switch (oneQuestion.type) {
      case 'buttons':
        return (
          <ButtonQuestion
            question={oneQuestion}
            validate={validate}
            i={i}
            setAnswer={oneQuestion.next ? undefined : setAnswer}
          />
        );
      case 'dropdown':
        return (
          <DropDown
            question={oneQuestion}
          />
        );
      case 'inputNumber':
        return (
          <NumberInput
            // answer={}
            // setAnswer={}
            
          />
        );
      case 'inputString':
        return (
          <ShortInput
            question={oneQuestion}
          />
        );
      case 'inputLong':
        return (
          <LongInput
            question={oneQuestion}
          />
        );
      default:
        return (<Text>No answer found!</Text>);
    }
  };

  return (
    <SafeAreaView>
      {question ? (
        <View style={{ justifyContent: 'space-between', height: '100%' }}>
          <View>
            {question.questions.map((one, i) => (
              <Card
                key={one.uid}
                style={{ margin: 30 }}
              >
                <Card.Content>
                  <Title>{one.label}</Title>
                  {renderAnswers(one, i)}
                </Card.Content>
              </Card>
            ))}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 30 }}>
            <Button raised mode="outlined" onPress={backHandler}>
              Back
            </Button>
            <Button raised mode="outlined" onPress={navigationHandler}>
              Next
            </Button>
          </View>
        </View>
      ) : (
        <Text>No question found.</Text>
      )}
    </SafeAreaView>
  );
};

TestTree.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
};

TestTree.defaultProps = {
  navigation: {
    navigate: () => null,
    goBack: () => this.navigate('Profile'),
  },
};

export default TestTree;
