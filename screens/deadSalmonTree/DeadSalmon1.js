import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import BackNext from '../../components/questions/BackNext';
import ThreeAnswer from '../../components/questions/ThreeAnswer';
import styles from '../../styles/QuestionStyles';

const DeadSalmon1 = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const question = 'Does salmon has spots on dorsan and caudal fin?';
  const answer1 = 'Yes';
  const answer2 = 'No';
  const answer3 = 'Tail Damaged';

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('FishDead1');
    } else if (selected === answer1) {
      navigation.navigate('DeadSalmonY');
    } else if (selected === answer2) {
      navigation.navigate('DeadSalmonN');
    } else if (selected === answer3) {
      navigation.navigate('DeadSalmonU');
    } else {
      Alert.alert('Please choose an option!');
    }
  };
  return (
    <View style={styles.container}>
      <ThreeAnswer
        question={question}
        answer1={answer1}
        answer2={answer2}
        choose={setSelected}
      />
      <BackNext navigationHandler={(direction) => navigationHandler(direction)} />
    </View>
  );
};

DeadSalmon1.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

DeadSalmon1.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default DeadSalmon1;
