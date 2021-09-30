import React from 'react';
import { View, ImageBackground } from 'react-native';
import PreviewButtons from './PreviewButtons';
import styles from '../../styles/CameraStyles';

interface Props {
  photo: {
    uri: string,
  },
  savePhoto: () => void,
  retakePicture: () => void,
}

const PreviewPhoto = ({ photo, savePhoto, retakePicture }: Props) => (
  <View style={styles.outerView}>
    <ImageBackground
      source={{ uri: photo && photo.uri }}
      style={styles.image}
    />
    <PreviewButtons savePhoto={savePhoto} retakePicture={retakePicture} />
  </View>
);

export default PreviewPhoto;
