import React from 'react';
import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { logo2 } from '../images';
import styles from '../styles/FormStyles';

const GoFishLogo = ({ title }) => (
  <View style={styles.headContainer}>
    <Image style={{ width: 3709 / 8, height: 1997 / 8 }} source={logo2} />
    <Text style={styles.signUp}>{title}</Text>
  </View>
);

GoFishLogo.propTypes = {
  title: PropTypes.string,
};

GoFishLogo.defaultProps = {
  title: '',
};

export default GoFishLogo;
