import React from 'react';
import { View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import PreviewButtons from './PreviewButtons';
import styles from '../../styles/CameraStyles';

const PreviewPhoto = ({ photo, savePhoto, retakePicture }) => (
  <View style={styles.outerView}>
    <ImageBackground
      source={{ uri: photo && photo.uri }}
      style={styles.image}
    />
    <PreviewButtons savePhoto={savePhoto} retakePicture={retakePicture} />
  </View>
);

PreviewPhoto.propTypes = {
  photo: PropTypes.shape({
    uri: PropTypes.string,
  }),
  savePhoto: PropTypes.func,
  retakePicture: PropTypes.func,
};

PreviewPhoto.defaultProps = {
  photo: {
    uri: '',
  },
  savePhoto: () => null,
  retakePicture: () => null,
};

export default PreviewPhoto;
