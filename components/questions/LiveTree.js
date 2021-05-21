import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { Surface, Title, Subheading } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';

const LiveTree = ({
  fish, description, normal, spawn,
}) => (
  <Surface style={styles.surface}>
    <Title style={{ alignSelf: 'center' }}>{fish}</Title>
    <Image
      source={normal}
      style={{ flex: 1, width: undefined, height: undefined }}
      resizeMode="contain"
    />
    <Subheading style={{ marginLeft: 50, fontStyle: 'italic' }}>
      Spawning
    </Subheading>
    <Image
      source={spawn}
      style={{ flex: 1, width: undefined, height: undefined }}
      resizeMode="contain"
    />
    <Subheading style={{ alignSelf: 'center' }}>{description}</Subheading>
  </Surface>
);

LiveTree.propTypes = {
  fish: PropTypes.string,
  description: PropTypes.string,
  normal: PropTypes.string || PropTypes.number,
  spawn: PropTypes.string || PropTypes.number,
};

LiveTree.defaultProps = {
  fish: '',
  description: '',
  normal: '',
  spawn: '',
};

export default LiveTree;
