import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { Button } from 'react-native-paper';
import FishCard from '../../components/FishCard';
import { chinook, coho, sockeye, pink, chum } from '../../images';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

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
      <View style={{ justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <FishCard title="Chinook Male" characteristic="black mouth, black gums" body pic={chinook.chinookMale} />
          <FishCard title="Chinook Female" characteristic="olive/maroon body" body pic={chinook.chinookFemale} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <FishCard title="Coho Male" characteristic="black mouth, white gums" body pic={coho.cohoMale} />
          <FishCard title="Coho Female" characteristic="maroon body, dark back" body pic={coho.cohoFemale} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <FishCard title="Sockeye Male" characteristic="white mouth, white gums" body pic={sockeye.sockeyeMale} />
          <FishCard title="Sockeye Female" characteristic="red body, green head" body pic={sockeye.sockeyeFemale} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <FishCard title="Pink Male" characteristic="white mouth, black gums" body pic={pink.pinkMale} />
          <FishCard title="Pink Female" characteristic="white body, green back" body pic={pink.pinkFemale} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <FishCard title="Chum Male" characteristic="white mouth, white gums" body pic={chum.chumMale} />
          <FishCard title="Chum Female" characteristic="green body, purple stripes" body pic={chum.chumFemale} />
        </View>
      </View>
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
