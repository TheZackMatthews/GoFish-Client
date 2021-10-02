import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { chum } from '../../images';

const DeadChum = ({ navigation }) => (
  <View style={styles.container}>
    <Card>
      <Card.Title title="Chum" subtitle="" />
      <Card.Cover source={chum.normal} />
    </Card>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('Fish1')}
    >
      Main Page
    </Button>
  </View>
);
DeadChum.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

DeadChum.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default DeadChum;
