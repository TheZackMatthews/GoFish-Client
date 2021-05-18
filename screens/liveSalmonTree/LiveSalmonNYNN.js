import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { chinook } from '../../images';

const LiveSalmonNYNN = ({ navigation }) => (
  <View style={styles.container}>
    <Card>
      <Card.Title title="Chinook" subtitle="Olive/maroon body" />
      <Card.Cover source={chinook.chinookFemale} />
    </Card>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('FishAlive1')}
    >
      Main Page
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
