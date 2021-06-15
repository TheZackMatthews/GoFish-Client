import React, { useState } from 'react';
import {
  Title, Button, Card, useTheme,
} from 'react-native-paper';
import { Text, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updatePin } from '../redux/actions/surveyActions';
import DropDown from '../components/questions/DropDown';
import ButtonQuestion from '../components/questions/ButtonQuestion';
import NumberInput from '../components/questions/NumberInput';
import LongInput from '../components/questions/LongInput';
import ShortInput from '../components/questions/ShortInput';
import questionnaire from '../constants/FishFlow';
import { DefaultRootState } from '../interfaces/state';

interface Props {
  navigation: {
    navigate: (page: string) => null;
  }
}

const TestTree = ({ navigation }: Props) => {
  const [question, setQuestion] = useState(questionnaire.start);
  const theme = useTheme();
  const pin = useSelector((state: DefaultRootState) => state.pin);
  const dispatch = useDispatch();
  let validation: boolean[] = [true];

  React.useEffect(() => {
    question.questions.forEach((one) => {
      validation.push(false);
      console.log(validation)
    });
  }, [question]);

  console.log(validation)
  const navigationHandler = async () => {

  };

  const backHandler = () => {
    // if (question.prev) setQuestion(question.prev);
    // else {
    //   try {
    //     navigation.goBack();
    //   } catch (error) {
    //     navigation.navigate('Profile');
    //   }
    // }
  };

  const clickHandler = (answerObject) => {
    // setButtonAns(answerObject);
    if (answerObject.data) {
      dispatch(updatePin({
        ...pin,
        [answerObject.data]: answerObject.value,
      }));
    }
  };

  const renderAnswers = (oneQuestion) => {
    switch (oneQuestion.type) {
      case 'buttons':
        return (
          <ButtonQuestion
            question={oneQuestion}
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
            question={oneQuestion}
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
            {question.questions.map((one) => (
              <Card
                key={one.uid}
                style={{ margin: 30 }}
              >
                <Card.Content>
                  <Title>{one.label}</Title>
                  {renderAnswers(one)}
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
