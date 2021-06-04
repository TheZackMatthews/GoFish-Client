import React from 'react';
import {
  Text, View, Image, ScrollView,
} from 'react-native';
import { Button, DataTable } from 'react-native-paper';
// import { referenceImg } from '../images'; //TODO Delete this and the file.

import forkLength from '../assets/references/forkLength.png'; // TODO
import adiposeFin from '../assets/references/HatcheryWild.jpeg';
import { refStyles as styles } from '../styles/AppStyles';

export default function ReferenceInfo({ navigation }) {
  // console.log(styles);
  return (
    <ScrollView>

      <View style={styles.container}>
        {/* <Button
          style={{ marginTop: 40 }}
          mode="contained"
          onPress={() => navigation.goBack()}
        >
          Back
        </Button> */}
        <Text style={styles.header}> Table of Contents </Text>
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

        <View>
          <Text style={styles.header}> Measuring Fork Length </Text>
          <Image
            resizeMode="contain"
            // style={styles.img}
            style={{ alignSelf: 'stretch' }}
            source={forkLength}
          />
        </View>
        <View>
          <Text style={styles.header}> Identifying a Redd </Text>
          <Image
            resizeMode="contain"
            style={{ alignSelf: 'stretch' }}
            source={forkLength}
          />
        </View>
        <View>
          <Text style={styles.header}> Identifying an Adipose Fin </Text>
          <Image
            resizeMode="contain"
            style={{ alignSelf: 'stretch' }}
            source={adiposeFin}
          />
        </View>
        <Text style={styles.header}> How to Identify Fish Sex </Text>
        <Text style={styles.header}> How to Tell if a Fish Has Spawned </Text>

      </View>
    </ScrollView>

  );
}
