import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { pink } from '../../images';

const DeadPink = ({ navigation }) => (
  <View style={styles.container}>
    <Card>
      <Card.Title title="Pink" subtitle="Check for black gum" />
      <Card.Cover source={pink.pinkFemale} />
    </Card>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('DeadFish1')}
    >
      Main Page
    </Button>
  </View>
);
DeadPink.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

DeadPink.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default DeadPink;
