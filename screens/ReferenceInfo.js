import React from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import images from '../images';
import { COLORS, SIZES, FONTS } from '../constants/theme';

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
        source={images.referenceImg}
      />
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Back
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    ...FONTS.h1,
    marginTop: SIZES.padding * 5, // I couldnt change space in btwn
  },
  constainer: {
    flex: 1,
  },
  img: {
    height: '100%',
    width: '100%',
  },
});

export default ReferenceInfo;
