import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { chinook } from '../../images';
import LiveTree from '../../components/questions/LiveTree';

const LiveSalmonNYNN = ({ navigation }) => (
  <View style={styles.container}>
    <LiveTree
      fish="Chinook"
      description="Olive and maroon body"
      normal={chinook.normal}
      spawn={chinook.spawn}
    />
    <Button
      mode="contained"
      onPress={() => navigation.navigate('FishAlive1')}
    >
      Return
    </Button>
  </View>
);
LiveSalmonNYNN.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LiveSalmonNYNN.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default LiveSalmonNYNN;
