import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const PreviewButtons = ({ savePhoto, retakePicture }) => {
  return (
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
  )
}

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff',
  }
});

export default PreviewButtons