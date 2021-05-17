import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import styles from '../../styles/QuestionStyles';

const LiveSalmonY = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const question = 'Was it bright red with a green head?';
  const answer1 = 'Yes';
  const answer2 = 'No';

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('LiveSalmon1');
    } else if (selected === answer1) {
      navigation.navigate('LiveSalmonYY');
    } else if (selected === answer2) {
      navigation.navigate('LiveSalmonYN');
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

LiveSalmonY.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LiveSalmonY.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default LiveSalmonY;
