import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

interface Props {
  answer: string,
  setAnswer: React.Dispatch<React.SetStateAction<string>>
}

const ShortInput = ({ answer, setAnswer }: Props) => (
  <View>
    <TextInput
      value={answer}
      onChangeText={(text) => setAnswer(text)}
    />
  </View>
);

export default ShortInput;
