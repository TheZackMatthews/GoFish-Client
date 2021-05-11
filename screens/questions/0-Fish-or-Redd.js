import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/actions/userActions'
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import styles from '../../styles/QuestionStyles';

const FishOrRedd = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const question = 'Did you find a fish or a redd?';
  const answer1 = 'Fish';
  const answer2 = 'Redd';
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  if (!user) dispatch(getUser());
  
  console.log(user.displayName);


  const navigationHandler = (direction) => {
    if (direction === 'back') {
      navigation.navigate('Profile');
    } else if (selected === answer1) {
      navigation.navigate('Fish1');
    } else if (selected === answer2) {
      navigation.navigate('Fish2');
    } else {
      alert('Please choose an option!');
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

FishOrRedd.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

FishOrRedd.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default FishOrRedd;
