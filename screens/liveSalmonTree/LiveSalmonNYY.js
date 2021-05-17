import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { sockeye } from '../../images';

const LiveSalmonNYY = ({ navigation }) => (
  <View style={styles.container}>
    <Card>
      <Card.Title title="Chum" subtitle="Green body, purple stripes" />
      <Card.Cover source={sockeye.sockeyeFemaleFemale} />
    </Card>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('FishAlive1')}
    >
      Main Page
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
