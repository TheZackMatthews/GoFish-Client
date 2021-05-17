import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-native-paper';
// import { Button } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { sockeye } from '../../images';

const LiveSalmonYY = ({ navigation }) => (
  <View style={styles.container}>
    <Card>
      <Card.Title title="Sockeye" subtitle="Red body, green head" />
      <Card.Cover source={sockeye.sockeyeFemale} />
    </Card>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('FishAlive1')}
    >
      Main Page
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
