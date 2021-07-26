import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { StateUser } from '../interfaces/state';

interface Props {
  editUser: StateUser,
  setEditUser: React.Dispatch<StateUser>,
}

const UploadImage = ({ editUser, setEditUser }: Props) => {
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('We need gallery permissions for this.');
      }
    })();
    if (editUser.photoURL) setImage(editUser.photoURL);
  }, []);

  const pickImage = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
