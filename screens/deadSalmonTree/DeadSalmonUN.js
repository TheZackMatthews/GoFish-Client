import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import styles from '../../styles/QuestionStyles';

const DeadSalmonUN = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const question = 'Is salmon large(greater than 35 inches) or small(less than 32 inches)?';
  const answer1 = 'Large';
  const answer2 = 'Small';

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('DeadSalmonU');
    } else if (selected === answer1) {
      navigation.navigate('DeadSalmonUNY');
    } else if (selected === answer2) {
      navigation.navigate('DeadSalmonUNN');
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

DeadSalmonUN.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

DeadSalmonUN.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default DeadSalmonUN;
