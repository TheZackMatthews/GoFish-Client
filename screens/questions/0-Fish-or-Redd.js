import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BackNext from '../../components/questions/BackNext';
import styles from '../../styles/QuestionStyles';

const FishOrRedd = ({ navigation }) => {
  const navigationHandler = (direction) => {
    if (direction === 'back') {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('SignIn');
    }
  };
  return (
    <View style={styles.container}>
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
