import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import styles from '../../styles/QuestionStyles';

const DeadSalmonUNY = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const question = 'Does it have red/purple vertical bars on body?';
  const answer1 = 'Yes';
  const answer2 = 'No';

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('DeadSalmonUN');
    } else if (selected === answer1) {
      navigation.navigate('DeadChum');
    } else if (selected === answer2) {
      navigation.navigate('DeadSalmonUNYN');
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

DeadSalmonUNY.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

DeadSalmonUNY.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default DeadSalmonUNY;
