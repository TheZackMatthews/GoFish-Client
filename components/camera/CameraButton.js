import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import PropTypes from 'prop-types';
import styles from '../../styles/CameraStyles';

const CameraButton = ({ takePicture }) => (
  <View style={styles.btnContainer}>
    <View style={styles.btnBorder}>
      <TouchableOpacity
        onPress={takePicture}
      >
        <Avatar.Icon
          style={styles.btn}
          icon="camera"
        />
      </TouchableOpacity>
    </View>
  </View>
);

CameraButton.propTypes = {
  takePicture: PropTypes.func,
};

CameraButton.defaultProps = {
  takePicture: () => null,
};

export default CameraButton;
