import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import styles from '../../styles/CameraStyles';

interface Props {
  takePicture: () => void,
}

const CameraButton = ({ takePicture }: Props) => (
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

export default CameraButton;
