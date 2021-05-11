import React, { useState } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import PreviewButtons from './PreviewButtons'

const PreviewPhoto = ({ photo, savePhoto, retakePicture }) => {
  return (
    <View style={styles.outerView}>
      <ImageBackground 
        source={{uri: photo && photo.uri}}
        style={styles.image}
      />
    <PreviewButtons savePhoto={savePhoto} retakePicture={retakePicture}/>
    </View>
  )
}

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
  }
})

export default PreviewPhoto
