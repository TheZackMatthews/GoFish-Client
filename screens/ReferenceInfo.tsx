import React from 'react';
import {
  Text, View, Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import { referenceImg } from '../images';
import { refStyles as styles } from '../styles/AppStyles';

function ReferenceInfo({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        style={{ marginTop: 40 }}
        mode="contained"
        onPress={() => navigation.goBack()}
      >
        Back
      </Button>
      <Text style={styles.header}>Details</Text>
      <Image
        resizeMode="contain"
        style={styles.img}
        source={referenceImg}
      />
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Back
      </Button>
    </View>
  );
}

export default ReferenceInfo;
