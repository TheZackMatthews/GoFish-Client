import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import {
  Card, Button, Title, List,
} from 'react-native-paper';

const TwoAnswer = ({
  question, answer1, answer2, choose,
}) => {
  const [selected, setSelected] = useState(null);

  const answer1Style = () => {
    if (selected === answer1) {
      return {
        borderRadius: 20,
        background: 'red',
      };
    }
    return null;
  };

  const answer2Style = () => {
    if (selected === answer2) {
      return {
        borderRadius: 20,
        background: 'red',
      };
    }
    return null;
  };

  const pressHandler = (answer) => {
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

export default TwoAnswer;
