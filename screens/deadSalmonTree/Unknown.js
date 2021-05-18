import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';

const Unknown = ({ navigation }) => (
  <View style={styles.container}>
    <Card>
      <Card.Title title="Unknown" />
    </Card>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('DeadFish1')}
    >
      Main Page
    </Button>
  </View>
);
Unknown.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Unknown.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default Unknown;
