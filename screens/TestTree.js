import React, { useState, useEffect } from 'react';
import {
  Title, Button, Card, TextInput,
} from 'react-native-paper';
import { Text, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updatePin } from '../redux/actions/surveyActions';
import DropDown from '../components/questions/DropDown';
import questionnaire from '../constants/FishFlow';

const TestTree = ({ navigation }) => {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const pin = useSelector((state) => state.pin);
  const dispatch = useDispatch();
  const [saveData, setSaveData] = useState({});

  useEffect(() => {
    setQuestion(questionnaire.start);
  }, []);

  const navigationHandler = async () => {
    if (selected) {
      await setSelected(null);
      if (selected.next) setQuestion(selected.next);
      else setQuestion(question.next);
    } else {
      Alert.alert('Please select an option!');
    }
  };

  const backHandler = () => {
    if (question.prev) setQuestion(question.prev);
    else navigation.navigate('Profile');
  };

  const clickHandler = (answerObject) => {
    setSelected(answerObject);
    if (answerObject.data) {
      dispatch(updatePin({
        ...pin,
        [answerObject.data]: answerObject.value,
      }));
    }
  };

  const styleRender = (answerObject) => {
    if (selected && answerObject.label === selected.label) {
      return {
        marginHorizontal: 5,
        marginVertical: 10,
        backgroundColor: 'yellow',
      };
    }
    return {
      marginHorizontal: 5,
      marginVertical: 10,
    };
  };

  const renderButtons = (oneQuestion) => oneQuestion.answers.map((one) => (
    <Button
      key={Math.floor(Math.random() * 2000)}
      raised
      mode="contained"
      style={styleRender(one)}
      onPress={() => clickHandler(one)}
    >
      {one.label}
    </Button>
  ));

  const renderDropDown = (oneQuestion) => (
    <DropDown
      question={oneQuestion}
    />
  );

  const renderNumber = (oneQuestion) => (
    <TextInput
      keyboardType="numeric"
      value={+saveData[oneQuestion.data] || +0}
      onChangeText={(number) => { setSaveData({ ...saveData, [oneQuestion.data]: number }); }}
    />
  );

  console.log(saveData);
  const renderString = (oneQuestion) => {
    console.log(oneQuestion.answers);
  };

  const renderLong = (oneQuestion) => {
    console.log(oneQuestion.answers);
  };

  const renderAnswers = (oneQuestion) => {
    switch (oneQuestion.type) {
      case 'buttons':
        return renderButtons(oneQuestion);
      case 'dropdown':
        return renderDropDown(oneQuestion);
      case 'inputNumber':
        return renderNumber(oneQuestion);
      case 'inputString':
        return renderString(oneQuestion);
      case 'inputLong':
        return renderLong(oneQuestion);
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
                key={Math.floor(Math.random() * 200)}
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
  }),
};

TestTree.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default TestTree;
