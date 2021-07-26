import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  Card,
  Title,
  List,
  useTheme,
} from 'react-native-paper';

interface Props {
  question: string,
  answer1: string,
  answer2: string,
  choose: React.Dispatch<React.SetStateAction<string>>,
}

const TwoAnswer = ({
  question, answer1, answer2, choose,
}: Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  const theme = useTheme();

  const answer1Style = () => {
    if (selected === answer1) {
      return {
        backgroundColor: theme.colors.light,
      };
    }
    return null;
  };

  const answer2Style = () => {
    if (selected === answer2) {
      return {
        backgroundColor: theme.colors.light,
      };
    }
    return null;
  };

  const pressHandler = (answer: string) => {
    choose(answer);
    setSelected(answer);
  };

  return (
    <View style={{ marginVertical: 10 }}>
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
