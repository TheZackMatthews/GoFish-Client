import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import styles from '../../styles/QuestionStyles';

const LiveSalmonNYN = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const question = 'Is the body of the fish dark red with an olive green back?';
  const answer1 = 'Yes';
  const answer2 = 'No';

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('LiveSalmon1');
    } else if (selected === answer1) {
      navigation.navigate('LiveSalmonNYNY');
    } else if (selected === answer2) {
      navigation.navigate('LiveSalmonNYNN');
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

LiveSalmonNYN.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LiveSalmonNYN.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default LiveSalmonNYN;
