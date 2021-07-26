import React from 'react';
import { Image, ImageProps } from 'react-native';
import { Surface, Title, Subheading } from 'react-native-paper';
import styles from '../../styles/QuestionStyles';

interface Props {
  fish: string,
  description: string,
  normal: ImageProps,
  spawn: ImageProps,
}

const LiveTree = ({
  fish, description, normal, spawn,
}: Props) => (
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

export default LiveTree;
