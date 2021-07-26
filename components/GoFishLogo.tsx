import React from 'react';
import { Text, View, Image } from 'react-native';
import { logo2 } from '../images';
import styles from '../styles/FormStyles';

interface Props {
  title: string,
}

const GoFishLogo = ({ title }: Props) => (
  <View style={styles.headContainer}>
    <Image style={{ width: 3709 / 8, height: 1997 / 8 }} source={logo2} />
    <Text style={styles.signUp}>{title}</Text>
  </View>
);

export default GoFishLogo;
