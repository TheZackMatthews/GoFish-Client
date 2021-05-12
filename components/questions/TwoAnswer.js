import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  Card, Title, List,
} from 'react-native-paper';

const TwoAnswer = ({
  question, answer1, answer2, choose,
}) => {
  const [selected, setSelected] = useState(null);

  const answer1Style = () => {
    if (selected === answer1) {
      return {
        backgroundColor: 'lightblue',
      };
    }
    return null;
  };

  const answer2Style = () => {
    if (selected === answer2) {
      return {
        backgroundColor: 'lightblue',
      };
    }
    return null;
  };

  const pressHandler = (answer) => {
    choose(answer);
    setSelected(answer);
  };

  return (
    <View>
      <Card>
        <Card.Content>
          <Title>{question}</Title>
          <View>

            <List.Item
              style={answer1Style()}
              title={answer1}
              onPress={() => pressHandler(answer1)}
            />
            <List.Item
              style={answer2Style()}
              title={answer2}
              onPress={() => pressHandler(answer2)}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

TwoAnswer.propTypes = {
  question: PropTypes.string,
  answer1: PropTypes.string || PropTypes.number,
  answer2: PropTypes.string || PropTypes.number,
  choose: PropTypes.func,
};

TwoAnswer.defaultProps = {
  question: '',
  answer1: '',
  answer2: '',
  choose: () => null,
};

export default TwoAnswer;
