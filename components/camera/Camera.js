import React, { useState, useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch, useSelector } from 'react-redux';
import CameraModal from './CameraModal';
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
  const [imageObject, setImageObject] = useState({ uri: '', comment: '', category: '' });
  const [modalVisible, setModalVisible] = useState(false);

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
    setImageObject({
      ...imageObject,
      uri: photo.uri,
    });
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  const addComment = () => {
    setModalVisible(true);
  };

  const savePhoto = async (photo) => {
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
      await dispatch(savePhotoToCameraRoll(photo));
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
        <>
          <CameraModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            imageObject={imageObject}
            setImageObject={setImageObject}
            savePhoto={savePhoto}
          />
          <PreviewPhoto
            photo={capturedImage}
            savePhoto={addComment}
            retakePicture={retakePicture}
          />
        </>
      ) : (
        <Camera
          style={styles.camera}
          type={type}
          // this will be different for different screens, this should be
          // a function
          ratio="16:9"
          // eslint-disable-next-line no-return-assign
          ref={(r) => camera = r}
        >
          <View style={styles.buttonContainer}>
            <CameraButton
              takePicture={takePicture}
            />
            <View style={styles.bottomButtons}>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.text}>Back</Text>
              </Button>
              <Button
                mode="contained"
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
              </Button>
            </View>
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
