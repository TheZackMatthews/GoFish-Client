import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { sockeye } from '../../images';
import LiveTree from '../../components/questions/LiveTree';

const LiveSalmonYY = ({ navigation }) => (
  <View style={styles.container}>
    <LiveTree
      fish="Sockeye"
      description="Red body, green head"
      normal={sockeye.normal}
      spawn={sockeye.spawn}
    />
    <Button
      mode="contained"
      onPress={() => navigation.navigate('FishAlive1')}
    >
      Return
    </Button>
  </View>
);
LiveSalmonYY.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LiveSalmonYY.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default LiveSalmonYY;
