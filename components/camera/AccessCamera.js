import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, Colors } from 'react-native-paper';

const AccessCamera = ({ navigationHandler }) => (
  <View style={{ justifyContent: 'center', flexDirection: 'row', marginVertical: 15 }}>
    <TouchableOpacity
      onPress={navigationHandler}
    >
      <Avatar.Icon
        style={{ backgroundColor: Colors.blue400 }}
        icon="camera"
        color={Colors.white}
        size={50}
      />
    </TouchableOpacity>
  </View>
);

AccessCamera.propTypes = {
  navigationHandler: PropTypes.func,
};

AccessCamera.defaultProps = {
  navigationHandler: () => null,
};

export default AccessCamera;
