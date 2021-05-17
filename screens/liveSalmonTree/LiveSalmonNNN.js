import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
// import { trout } from '../../images';

const LiveSalmonNNN = ({ navigation }) => (
  <View style={styles.container}>
    <Card>
      <Card.Title title="Trout or Jack" subtitle="White belly, gray back" />
      {/* <Card.Cover source={trout.troutFemale} /> */}
      {/* trout or jack picture and info */}
    </Card>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('FishAlive1')}
    >
      Main Page
    </Button>
  </View>
);
LiveSalmonNNN.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LiveSalmonNNN.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default LiveSalmonNNN;
