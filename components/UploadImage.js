import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const UploadImage = ({ editUser, setEditUser }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('We need gallery permissions for this.');
      }
    })();
    if (editUser.photoURL) setImage(editUser.photoURL);
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
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

UploadImage.propTypes = {
  editUser: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
    phoneNumber: PropTypes.string,
    creationTime: PropTypes.string,
    lastSignInTime: PropTypes.string,
  }),
  setEditUser: PropTypes.func,
};

UploadImage.defaultProps = {
  editUser: {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    creationTime: '',
    lastSignInTime: '',
  },
  setEditUser: () => null,
};

export default UploadImage;
