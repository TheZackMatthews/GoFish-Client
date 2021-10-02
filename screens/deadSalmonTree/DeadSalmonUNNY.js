import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import styles from '../../styles/QuestionStyles';

const DeadSalmonUNNY = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const question = 'Is salmon in a stream associated with a lake?';
  const answer1 = 'Yes';
  const answer2 = 'No';

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('DeadSalmonUNN');
    } else if (selected === answer1) {
      navigation.navigate('DeadSockeye');
    } else if (selected === answer2) {
      navigation.navigate('DeadCoho');
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

DeadSalmonUNNY.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

DeadSalmonUNNY.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default DeadSalmonUNNY;
