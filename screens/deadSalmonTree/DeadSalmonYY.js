import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import styles from '../../styles/QuestionStyles';

const DeadSalmonYY = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const question = 'Is salmon large(greater than 35 inches) or small(less than 32 inches)?';
  const answer1 = 'Large';
  const answer2 = 'Small';

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('DeadSalmonY');
    } else if (selected === answer1) {
      navigation.navigate('DeadChinook');
    } else if (selected === answer2) {
      navigation.navigate('DeadPink');
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

DeadSalmonYY.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

DeadSalmonYY.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default DeadSalmonYY;
