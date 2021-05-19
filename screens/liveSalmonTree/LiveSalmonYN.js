import React from 'react';
import { View } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import PropTypes from 'prop-types';
import styles from '../../styles/QuestionStyles';

const LiveSalmonYN = ({ navigation }) => (
  <View style={styles.container}>
    <Card>
      <Card.Content>
        <Title>We are unable to identify this fish. Please respond with &quot;unknown.&quot;</Title>
      </Card.Content>
    </Card>

    <Button
      mode="contained"
      onPress={() => navigation.navigate('FishAlive1')}
    >
      Return
    </Button>
  </View>
);
LiveSalmonYN.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LiveSalmonYN.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default LiveSalmonYN;
