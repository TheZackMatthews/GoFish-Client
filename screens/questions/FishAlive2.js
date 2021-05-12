import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-paper';
import BackNext from '../../components/questions/BackNext';
import styles from '../../styles/QuestionStyles';

const FishAlive2 = ({ navigation }) => {
  const [textInput, setTextInput] = useState('');

  const navigationHandler = (direction) => {
    if (direction === 'back') {
      navigation.navigate('FishAlive1');
    } else if (textInput !== '') {
      navigation.navigate('FishOrRedd');
    } else {
      alert('Please type notes!');
    }
  };
  return (
    <View style={styles.container}>
      <Text>Notes</Text>
      <TextInput
        value={textInput}
        multiline="true"
        numberOfLines="12"
        onChangeText={(text) => setTextInput({ text })}
      />

      <BackNext navigationHandler={(direction) => navigationHandler(direction)} />

    </View>
  );
};

FishAlive2.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

FishAlive2.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default FishAlive2;
