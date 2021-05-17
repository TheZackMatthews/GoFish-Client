import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { chinook } from '../../images';

const DeadChinook = ({ navigation }) => (
  <View style={styles.container}>
    <Card>
      <Card.Title title="Chinook" subtitle="Check for black gum" />
      <Card.Cover source={chinook.chinookFemale} />
    </Card>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('DeadFish1')}
    >
      Main Page
    </Button>
  </View>
);
DeadChinook.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

DeadChinook.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default DeadChinook;
