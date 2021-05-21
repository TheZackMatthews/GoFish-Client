import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { coho } from '../../images';
import LiveTree from '../../components/questions/LiveTree';

const LiveSalmonNYNY = ({ navigation }) => (
  <View style={styles.container}>
    <LiveTree
      fish="Coho"
      description="Maroon body, dark back"
      normal={coho.normal}
      spawn={coho.spawn}
    />
    <Button
      mode="contained"
      onPress={() => navigation.navigate('FishAlive1')}
    >
      Return
    </Button>
  </View>
);
LiveSalmonNYNY.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LiveSalmonNYNY.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default LiveSalmonNYNY;
