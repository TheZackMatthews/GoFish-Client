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
import AccessCamera from '../components/camera/AccessCamera';
import CameraButton from '../components/camera/CameraButton';

interface Props {
  navigation: {
    navigate: (page: string) => null;
    goBack: () => null;
  }
}

const TestTree = ({ navigation }: Props) => {
  const [question, setQuestion] = useState(questionnaire.start);
  const [answer, setAnswer] = useState<IAnswer | undefined>(undefined);

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
      if (question.next) {
        if (!question.next.prev) {
          let newNext = question.next;
          newNext.prev = question;
          setQuestion(newNext)
        } else setQuestion(question.next)
      } else if (answer !== undefined && answer.next) {
        if (!answer.next.prev) {
          let newNext = answer.next;
          newNext.prev = question;
          setQuestion(newNext);
        } else setQuestion(answer.next)
      }
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
            setAnswer={oneQuestion.next ? undefined : setAnswer}
            validate={validate}
            i={i}
          />
        );
      case 'inputNumber':
        return (
          <NumberInput
            question={oneQuestion}
            validate={validate}
            i={i}
          />
        );
      case 'inputString':
        return (
          <ShortInput
            question={oneQuestion}
            validate={validate}
            i={i}
          />
        );
      case 'inputLong':
        return (
          <LongInput
            question={oneQuestion}
            validate={validate}
            i={i}
          />
        );
      case 'photo':
        return (
          <AccessCamera
            navigation={navigation}
          />
        )
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
            <Button mode="outlined" onPress={backHandler}>
              Back
            </Button>
            <Button mode="outlined" onPress={navigationHandler}>
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

export default TestTree;
