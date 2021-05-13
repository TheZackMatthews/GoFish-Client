import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles/CameraStyles';

const PreviewButtons = ({ savePhoto, retakePicture }) => (
  <View style={styles.btnContainer}>
    <View style={styles.btnBorder}>
      <TouchableOpacity
        style={styles.btn}
        onPress={savePhoto}
      >
        <Text>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={retakePicture}
      >
        <Text>Retake</Text>
      </TouchableOpacity>
    </View>
  </View>
);

PreviewButtons.propTypes = {
  savePhoto: PropTypes.func,
  retakePicture: PropTypes.func,
};

PreviewButtons.defaultProps = {
  savePhoto: () => null,
  retakePicture: () => null,
};

export default PreviewButtons;
