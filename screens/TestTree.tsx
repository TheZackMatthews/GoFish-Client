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

  // answers - set to false if present
  // validation should be done on the individual pages so that 
  // multiple items of the same kind can be used.
  const [buttonAns, setButtonAns] = useState(true);
  const [dropdownAns, setDropdownAns] = useState(true);
  const [numberAns, setNumberAns] = useState(1);
  const [stringAns, setStringAns] = useState(' ');
  const [longAns, setLongAns] = useState(' ');
  const [photoAns, setPhotoAns] = useState(true);

  // console.log(pin);

  React.useEffect(() => {
    question.questions.forEach((one) => {
      if (one.type === 'buttons') setButtonAns(false);
      if (one.type === 'dropdown') setDropdownAns(false);
      if (one.type === 'inputNumber') setNumberAns('');
      if (one.type === 'inputString') setStringAns('');
      if (one.type === 'inputLong') setLongAns('');
      if (one.type === 'photo') setPhotoAns({});
    });
  }, [question]);

  console.log(buttonAns, dropdownAns, numberAns, stringAns, longAns);

  const navigationHandler = async () => {
    if (buttonAns && dropdownAns && numberAns && stringAns && longAns) {
      await setButtonAns(true);
      await setDropdownAns(true);
      await setNumberAns(1);
      await setStringAns(' ');
      await setLongAns(' ');
      await setPhotoAns()
      if (buttonAns.next) setQuestion(buttonAns.next);
      else if (dropdownAns.next) setQuestion(dropdownAns.next);
      else if (question.next) setQuestion(question.next);
    } else {
      Alert.alert('Please select an option!');
    }
  };

  const backHandler = () => {
    if (question.prev) setQuestion(question.prev);
    else {
      try {
        navigation.goBack();
      } catch (error) {
        navigation.navigate('Profile');
      }
    }
  };

  const clickHandler = (answerObject) => {
    setButtonAns(answerObject);
    if (answerObject.data) {
      dispatch(updatePin({
        ...pin,
        [answerObject.data]: answerObject.value,
      }));
    }
  };

  const styleRender = (answerObject) => {
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

  const renderButtons = (oneQuestion) => oneQuestion.answers.map((one) => (
    <Button
      key={one.uid}
      raised
      mode="contained"
      style={styleRender(one)}
      onPress={() => clickHandler(one)}
    >
      {one.label}
    </Button>
  ));

  const renderAnswers = (oneQuestion) => {
    switch (oneQuestion.type) {
      case 'buttons':
        return renderButtons(oneQuestion);
      case 'dropdown':
        return (
          <DropDown
            question={oneQuestion}
            setAnswer={setDropdownAns}
            answer={dropdownAns}
          />
        );
      case 'inputNumber':
        return (
          <NumberInput
            question={oneQuestion}
            setAnswer={setNumberAns}
            answer={numberAns}
          />
        );
      case 'inputString':
        return (
          <ShortInput
            question={oneQuestion}
            setAnswer={setStringAns}
            answer={stringAns}
          />
        );
      case 'inputLong':
        return (
          <LongInput
            question={oneQuestion}
            answer={longAns}
            setAnswer={setLongAns}
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
