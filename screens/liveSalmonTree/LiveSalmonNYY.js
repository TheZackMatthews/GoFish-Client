import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { chum } from '../../images';
import LiveTree from '../../components/questions/LiveTree';

const LiveSalmonNYY = ({ navigation }) => (
  <View style={styles.answerContainer}>
    <LiveTree
      fish="Chum"
      description="Green body, purple stripes"
      normal={chum.normal}
      spawn={chum.spawn}
    />
    <Button
      mode="contained"
      onPress={() => navigation.navigate('FishAlive1')}
    >
      Return
    </Button>
  </View>
);
LiveSalmonNYY.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LiveSalmonNYY.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default LiveSalmonNYY;
