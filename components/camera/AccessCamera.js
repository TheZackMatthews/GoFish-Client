import React from 'react';
import { View } from 'react-native';
import { Avatar, Colors } from 'react-native-paper';

const AccessCamera = () => (
  <View style={{ justifyContent: 'center', flexDirection: 'row', marginVertical: 15 }}>
    <Avatar.Icon
      style={{ backgroundColor: Colors.blue400 }}
      icon="camera"
      color={Colors.white}
      size={50}
      onPress={() => console.log('Pressed')}
    />
  </View>
);

export default AccessCamera;
