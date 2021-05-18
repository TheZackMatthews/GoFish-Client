import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import styles from '../../styles/QuestionStyles';

const LiveSalmonNN = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const question = 'Did the salmon have a prominent hump in front of the dorsal fin?';
  const answer1 = 'Yes';
  const answer2 = 'No';

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('LiveSalmonN');
    } else if (selected === answer1) {
      navigation.navigate('LiveSalmonNNY');
    } else if (selected === answer2) {
      navigation.navigate('LiveSalmonNNN');
    } else {
      Alert.alert('Please choose an option!');
    }
  };
  return (
    <View style={styles.container}>
      <TwoAnswer
        question={question}
        answer1={answer1}
        answer2={answer2}
        choose={setSelected}
      />
      <BackNext navigationHandler={(direction) => navigationHandler(direction)} />
    </View>
  );
};

LiveSalmonNN.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LiveSalmonNN.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default LiveSalmonNN;
