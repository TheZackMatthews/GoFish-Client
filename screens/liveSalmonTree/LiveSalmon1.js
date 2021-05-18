import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from 'react-redux';
// import { getUser } from '../../redux/actions/userActions';
// import { updatePin, getPin } from '../../redux/actions/storageActions';
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import styles from '../../styles/QuestionStyles';

const LiveSalmon1 = ({ navigation }) => {
  // const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const question = 'Is the stream you are surveying associated with a large lake?';
  const answer1 = 'Yes';
  const answer2 = 'No';

  // useEffect(() => {
  //   if (Object.keys(pin).length < 2) {
  //     dispatch(getPin());
  //   }
  // }, []);

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('FishAlive1');
    } else if (selected === answer1) {
      navigation.navigate('LiveSalmonY');
    } else if (selected === answer2) {
      navigation.navigate('LiveSalmonN');
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

LiveSalmon1.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LiveSalmon1.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default LiveSalmon1;
