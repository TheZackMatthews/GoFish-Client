import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { sockeye } from '../../images';

const DeadSockeye = ({ navigation }) => (
  <View style={styles.container}>
    <Card>
      <Card.Title title="Sockeye" subtitle="" />
      <Card.Cover source={sockeye.normal} />
    </Card>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('Fish1')}
    >
      Main Page
    </Button>
  </View>
);
DeadSockeye.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

DeadSockeye.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default DeadSockeye;
