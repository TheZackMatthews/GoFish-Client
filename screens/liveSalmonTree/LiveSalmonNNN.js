import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { trout } from '../../images';
import LiveTree from '../../components/questions/LiveTree';

const LiveSalmonNNN = ({ navigation }) => (
  <ScrollView>
    <View style={styles.answerContainer}>
      <LiveTree
        fish="Trout"
        description="White belly, gray back"
        normal={trout.normal}
        spawn={trout.spawn}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('FishAlive1')}
      >
        Main Page
      </Button>
    </View>
  </ScrollView>
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
