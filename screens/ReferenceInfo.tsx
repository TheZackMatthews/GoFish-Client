import React, { useState } from 'react';
import {
  Text, View, Image, ScrollView, Dimensions, TouchableOpacity, scrollToEnd,
} from 'react-native';
import { Button, DataTable } from 'react-native-paper';
// import { referenceImg } from '../images'; //TODO Delete this and the file.

import PropTypes from 'prop-types';
import forkLength from '../assets/references/forkLength.png'; // TODO
import adiposeFin from '../assets/references/HatcheryWild.jpeg';
import reddHighlight from '../assets/references/reddHighlight.png';
import reddNoHighlight from '../assets/references/reddNoHighlight.png';
import { refStyles as styles } from '../styles/AppStyles';

export default function ReferenceInfo({ navigation }) {
  const screenWidth = Dimensions.get('window').width; // full width
  const screenHeight = Dimensions.get('window').height;

  function renderReddImage() {
    const [reddPicture, setReddPicture] = useState(reddNoHighlight);
    const [previousReddPicture, setPreviousReddPicture] = useState(reddHighlight);
    const toggleReddImage = () => {
      const temp = reddPicture;
      setReddPicture(previousReddPicture);
      setPreviousReddPicture(temp);
    };
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'teal', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}
        onPress={() => (toggleReddImage())}
      >
        {/* The width and height here are intentionally not 100% to allow for a border.
        The height also needed to be downscaled as it left empry space in the View */}
        <Image
          resizeMode="contain"
          style={{ width: screenWidth - 3, height: Math.floor(screenWidth * 0.76 - 2) }}
          source={reddPicture}
        />
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={styles.header}> Table of Contents </Text>
        <TouchableOpacity
          style={{ backgroundColor: 'teal' }}
          onPress={() => (ScrollView.scrollToEnd())}
        >
          <Text>test</Text>
        </TouchableOpacity> */}
        <Text style={styles.header}> Quick Reference </Text>
        <View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Body</DataTable.Title>
              <DataTable.Title>Mouth/gums</DataTable.Title>
            </DataTable.Header>
            {/* Chinook  */}
            <DataTable.Row>
              <DataTable.Cell>Chinook</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>Olive/maroon</DataTable.Cell>
              <DataTable.Cell>Black/black</DataTable.Cell>
            </DataTable.Row>
            {/* Chum  */}
            <DataTable.Row>
              <DataTable.Cell>Chum</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>Green body, purple stripes</DataTable.Cell>
              <DataTable.Cell>White/white</DataTable.Cell>
            </DataTable.Row>
            {/* Coho  */}
            <DataTable.Row>
              <DataTable.Cell>Coho</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>Maroon body, dark back</DataTable.Cell>
              <DataTable.Cell>Black/white</DataTable.Cell>
            </DataTable.Row>
            {/* Pink  */}
            <DataTable.Row>
              <DataTable.Cell>Pink</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>White belly, grey back</DataTable.Cell>
              <DataTable.Cell>White/black</DataTable.Cell>
            </DataTable.Row>
            {/* Sockeye  */}
            <DataTable.Row>
              <DataTable.Cell>Sockeye</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>Red body, green head</DataTable.Cell>
              <DataTable.Cell>White/white</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>

        <Text style={styles.header}> Measuring Fork Length </Text>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text> Fork length is defined as the distance from the tip of the nose to the fork in the tail. </Text>
          <Image
            resizeMode="contain"
            style={{ width: Math.floor(screenWidth * 0.8) }}
            source={forkLength}
          />
        </View>
        <View>
          <Text style={styles.header}> Identifying a Redd </Text>
          <Text>
            Salmon redds are generally between 1-2 square meters in size and may be recognized by the appearance of clean looking gravel which is loose and soft underfoot,
            as opposed to firmer and darker gravel nearby. Steelhead and trout will often use the same areas as the salmon to spawn. When newly formed, redds will appear to be a
            depression with a mound of gravel on the downstream side. Eggs will be buried in the mound of gravel and for several meters downstream.
          </Text>
          <Text style={{ marginTop: 10 }}> Tap the below image to reveal which areas are redd </Text>
          {renderReddImage()}
        </View>
        <View>
          <Text style={styles.header}> Identifying an Adipose Fin </Text>
          <Image
            resizeMode="contain"
            style={{
              width: screenWidth, height: Math.floor(screenWidth / 2),
            }}
            source={adiposeFin}
          />
        </View>
        <Text style={styles.header}> How to Identify Fish Sex </Text>
        <Text style={styles.header}> How to Tell if a Fish Has Spawned </Text>
      </View>
      <Button
        style={{ marginTop: 40 }}
        mode="contained"
        onPress={() => navigation.goBack()}
      >
        Back
      </Button>
    </ScrollView>

  );
}

ReferenceInfo.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

ReferenceInfo.defaultProps = {
  navigation: {
    goBack: () => null,
  },
};