import React from 'react';
import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { logos } from '../images';
import styles from '../styles/FormStyles';

const GoFishLogo = ({ title }) => (
  <View style={styles.headContainer}>
    {/* <Text style={styles.firstHeader}>Go Fish</Text> */}
    <Image style={{ width: 3709 / 8, height: 1997 / 8 }} source={logos.logo4} />
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
