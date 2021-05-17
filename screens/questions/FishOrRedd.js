import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/actions/userActions';
import { updatePin } from '../../redux/actions/surveyActions';
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import AccessCamera from '../../components/camera/AccessCamera';
import styles from '../../styles/QuestionStyles';

const FishOrRedd = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const pin = useSelector((state) => state.pin);
  if (!user) dispatch(getUser());

  const question = 'Did you find a fish or a redd?';
  const answer1 = 'Fish';
  const answer2 = 'Redd';

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('Profile');
    } else if (selected === answer1) {
      navigation.navigate('Fish1');
    } else if (selected === answer2) {
      await dispatch(updatePin({
        ...pin,
        fish_status: 'redd',
      }));
      navigation.navigate('Redd1');
    } else {
      Alert.alert('Please choose an option!');
    }
  };

  const cameraNav = () => {
    navigation.navigate('Camera');
  };
  console.log(pin);
  return (
    <View style={styles.container}>
      <TwoAnswer
        question={question}
        answer1={answer1}
        answer2={answer2}
        choose={setSelected}
      />
      <View>
        <AccessCamera navigationHandler={cameraNav} />
        <BackNext navigationHandler={(direction) => navigationHandler(direction)} />
      </View>
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
