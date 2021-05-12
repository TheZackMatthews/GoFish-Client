import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/QuestionStyles';
import { SIZES } from '../../constants/theme';

const BackNext = ({ navigationHandler }) => (
  <View style={styles.btnContainer}>
    <Button
      style={{ width: SIZES.width / 4 }}
      mode="contained"
      onPress={() => navigationHandler('back')}
    >
      <Icon name="arrow-left-bold" />
      <Text style={styles.next}> Back</Text>
    </Button>
    <Button
      style={{ width: SIZES.width / 4 }}
      mode="contained"
      onPress={() => navigationHandler('next')}
    >
      <Text style={styles.next}>Next </Text>
      <Icon name="arrow-right-bold" />
    </Button>
  </View>
);

BackNext.propTypes = {
  navigationHandler: PropTypes.func,
};

BackNext.defaultProps = {
  navigationHandler: () => null,
};

export default BackNext;
