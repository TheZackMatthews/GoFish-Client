import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { pink } from '../../images';
import LiveTree from '../../components/questions/LiveTree';

const LiveSalmonNNY = ({ navigation }) => (
  <View style={styles.container}>
    <LiveTree
      fish="Pink"
      description="White belly, grey back"
      normal={pink.normal}
      spawn={pink.spawn}
    />
    <Button
      mode="contained"
      onPress={() => navigation.navigate('FishAlive1')}
    >
      Return
    </Button>
  </View>
);
LiveSalmonNNY.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LiveSalmonNNY.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default LiveSalmonNNY;
