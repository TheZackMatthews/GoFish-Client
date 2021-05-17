import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { pink } from '../../images';

const LiveSalmonNNY = ({ navigation }) => (
  <View style={styles.container}>
    <Card>
      <Card.Title title="Pink" subtitle="White belly, gray back" />
      <Card.Cover source={pink.pinkFemale} />
    </Card>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('FishAlive1')}
    >
      Main Page
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