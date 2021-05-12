import React from 'react';
import {
  View, StyleSheet, ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import PreviewButtons from './PreviewButtons';

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
  },
});

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
