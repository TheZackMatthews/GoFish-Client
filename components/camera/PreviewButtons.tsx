import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import styles from '../../styles/CameraStyles';

const PreviewButtons = ({ savePhoto, retakePicture }) => (
  <View style={styles.btnContainer}>
    <View style={styles.twoBtnBorder}>
      <Button
        onPress={savePhoto}
        mode="contained"
      >
        Save
      </Button>
      <Button
        mode="contained"
        onPress={retakePicture}
      >
        Retake
      </Button>
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
