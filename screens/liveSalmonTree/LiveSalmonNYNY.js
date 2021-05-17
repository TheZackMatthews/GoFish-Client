import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { coho } from '../../images';

const LiveSalmonNYNY = ({ navigation }) => (
  <View style={styles.container}>
    <Card>
      <Card.Title title="Coho" subtitle="Maroon body, dark back" />
      <Card.Cover source={coho.cohoFemale} />
    </Card>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('FishAlive1')}
    >
      Main Page
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
