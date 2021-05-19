import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  Surface,
  Title,
  Subheading,
} from 'react-native-paper';
import styles from '../../styles/QuestionStyles';
import { coho } from '../../images';

const LiveSalmonNNN = ({ navigation }) => (
  <View style={styles.answerContainer}>
    <Surface style={styles.surface}>
      <Title style={{ alignSelf: 'center' }}>Trout or Jack</Title>
      <Image
        source={coho.cohoFemale}
        style={{ flex: 1, width: undefined, height: undefined }}
        resizeMode="contain"
      />
      <Image
        source={coho.cohoMale}
        style={{ flex: 1, width: undefined, height: undefined }}
        resizeMode="contain"
      />
      <Subheading style={{ alignSelf: 'center' }}>White belly, gray back</Subheading>
    </Surface>
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
