import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import CameraButton from './CameraButton';
import PreviewPhoto from './PreviewPhoto';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/actions/userActions';
import { savePhotoToFB } from '../../redux/actions/cameraActions';

const CameraComponent = () => {
  const [ hasPermission, setHasPermission ] = useState(null);
  const [ type, setType ] = useState(Camera.Constants.Type.back);
  const [ previewVisible, setPreviewVisible ] = useState(false);
  const [ capturedImage, setCapturedImage ] = useState(null);
  
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  if (!user) dispatch(getUser())
    
  let camera;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
   
  }, []);

  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  }

  const retakePicture = () => {
    console.log('retake')
    setCapturedImage(null);
    setPreviewVisible(false);
  }

  
  const savePhoto = async () => {
    
    dispatch(savePhotoToFB(user, capturedImage))
    console.log('save')
    
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <PreviewPhoto 
          photo={capturedImage} 
          savePhoto={savePhoto}
          retakePicture={retakePicture}
          />
      ) : (
      <Camera 
        style={styles.camera} 
        type={type}
        ref={(r) => camera = r}
        >
        <View style={styles.buttonContainer}>
          <CameraButton 
            takePicture={takePicture}
            />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      )}
    </View>
  );
}

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
