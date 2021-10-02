import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import styles from '../../styles/QuestionStyles';

const DeadSalmonUNYN = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const question = 'Does it have black gums?';
  const answer1 = 'Yes';
  const answer2 = 'No';

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('DeadSalmonUNY');
    } else if (selected === answer1) {
      navigation.navigate('DeadChinook');
    } else if (selected === answer2) {
      navigation.navigate('Unknown');
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

DeadSalmonUNYN.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

DeadSalmonUNYN.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default DeadSalmonUNYN;
