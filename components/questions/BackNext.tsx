import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/QuestionStyles';
import { SIZES } from '../../constants/Theme';

interface Props {
  navigationHandler: (direction: string) => void,
}

const BackNext = ({ navigationHandler }: Props) => (
  <View style={styles.btnContainer}>
    <Button
      style={{ width: SIZES.width / 4 }}
      mode="contained"
      onPress={() => navigationHandler('back')}
    >
      <Icon name="arrow-left-bold" />
      <Text> Back</Text>
    </Button>
    <Button
      style={{ width: SIZES.width / 4 }}
      mode="contained"
      onPress={() => navigationHandler('next')}
    >
      <Text>Next </Text>
      <Icon name="arrow-right-bold" />
    </Button>
  </View>
);

export default BackNext;
