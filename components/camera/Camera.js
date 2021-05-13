import React, { useState, useEffect } from 'react';
import {
  Text, View, TouchableOpacity, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch, useSelector } from 'react-redux';
import CameraButton from './CameraButton';
import PreviewPhoto from './PreviewPhoto';
import { getUser } from '../../redux/actions/userActions';
import { savePhotoToCameraRoll } from '../../redux/actions/cameraActions';
import styles from '../../styles/CameraStyles';

const CameraComponent = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [rollPermission, setRollPermission] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  if (!user) dispatch(getUser());

  let camera;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setRollPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const retakePicture = () => {
    console.log('retake');
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  const savePhoto = async () => {
    if (rollPermission === null || rollPermission === false) {
      Alert.alert(
        'Access denied',
        'Cannot save without camera roll permissions.',
        [{
          text: 'Okay',
          style: 'cancel',
        }],
      );
    } else {
      await dispatch(savePhotoToCameraRoll(capturedImage));
      navigation.goBack();
    }
  };

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
          // eslint-disable-next-line no-return-assign
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
                    : Camera.Constants.Type.back,
                );
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

CameraComponent.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

CameraComponent.defaultProps = {
  navigation: {
    goBack: () => null,
  },
};

export default CameraComponent;
