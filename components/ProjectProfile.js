import React from 'react';
import { Text, View, Image } from 'react-native';

import { Avatar, Button } from 'react-native-paper';
import images from '../images';
import styles from '../styles/FormStyles';

const ProjectProfile = ({ title }) => (
  <View style={styles.headContainer}>
    <Avatar.Image size={100} source={images.profilePic} />
    <Text />
    <View style={styles.infoText}>
      <Text style={styles.secondHeader}>Contact Information</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.infoTextCategory}>Phone Number:</Text>
        <Text style={styles.infoText}>333-333-3333</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.infoTextCategory}>Email:</Text>
        <Text style={styles.infoText}>{title.email}</Text>
      </View>
    </View>
    <Button mode="contained" style={{ marginTop: 30 }} onPress={() => console.log('Pressed')}>Edit Info</Button>
    <View>
      <Text style={styles.secondHeader}>Active Project</Text>
      <Text style={styles.infoText}>Chinook Salmon Monitoring</Text>
      <Text style={styles.infoText}>Vegetation Monitoring</Text>
    </View>

    <Button mode="contained" style={{ marginTop: 30 }} onPress={() => console.log('Pressed')}>User Map</Button>
  </View>
);

export default ProjectProfile;
