import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/QuestionStyles';

const BackNext = ({ navigationHandler }) => (
  <View style={styles.btnContainer}>
    <Button icon="arrow-left-bold" mode="contained" onPress={() => navigationHandler('back')}>
      Back
    </Button>
    <Button mode="contained" onPress={() => navigationHandler('next')}>
      <Text style={styles.next}>Next</Text>
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
