import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, Image, Platform, TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const UploadImage = ({ editUser, setEditUser }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const types = ['image/png', 'image/jpeg'];

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('We need camera permissions for this.');
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setEditUser({ ...editUser, photoURL: result.uri });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Avatar.Image source={{ uri: image }} size={200} />
        ) : (

          <Avatar.Icon size={200} icon="camera-plus-outline" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UploadImage;
