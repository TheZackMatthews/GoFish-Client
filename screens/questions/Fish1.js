import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/userActions';
import { updatePin } from '../../redux/actions/surveyActions';
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import styles from '../../styles/QuestionStyles';

const Fish1 = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  if (!user) dispatch(getUser());
  const pin = useSelector((state) => state.pin);
  const [selected, setSelected] = useState(null);
  const question = 'Is the fish alive or dead?';
  const answer1 = 'Alive';
  const answer2 = 'Dead';

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('FishOrRedd');
    } else if (selected === answer1) {
      await dispatch(updatePin({
        ...pin,
        fish_status: 'live',
      }));
      navigation.navigate('FishAlive1');
    } else if (selected === answer2) {
      await dispatch(updatePin({
        ...pin,
        fish_status: 'carcass',
      }));
      navigation.navigate('FishDead1');
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

Fish1.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Fish1.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default Fish1;
