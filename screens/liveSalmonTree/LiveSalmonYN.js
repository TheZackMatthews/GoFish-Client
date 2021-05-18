import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import styles from '../../styles/QuestionStyles';

const LiveSalmonYN = ({ navigation }) => (
  <View style={styles.container}>

    <Text>Sockeye</Text>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('FishAlive1')}
    >
      Main Page
    </Button>
  </View>
);
LiveSalmonYN.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LiveSalmonYN.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default LiveSalmonYN;
