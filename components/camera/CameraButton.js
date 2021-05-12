import React from 'react';
import {
  View, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between',
  },
  btnBorder: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
  },
  btn: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
});

const CameraButton = ({ takePicture }) => (
  <View style={styles.btnContainer}>
    <View style={styles.btnBorder}>
      <TouchableOpacity
        onPress={takePicture}
        style={styles.btn}
      />
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
