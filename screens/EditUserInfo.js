import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Title,
  Button,
  TextInput,
} from 'react-native-paper';
import {
  getUser,
  updateProfile,
  profilePicture,
  updateEmail,
} from '../redux/actions/userActions';
import styles from '../styles/UserStyles';
import UploadImage from '../components/UploadImage';

function EditUserInfo({ navigation }) {
  const [errorM, setErrorM] = useState('');
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [editUser, setEditUser] = useState('');

  useEffect(() => {
    if (!user) dispatch(getUser());
    setEditUser(user || '');
  }, [user]);

  useEffect(() => {
    if (progress === 100) navigation.navigate('Profile');
    setProgress(0);
  }, [progress]);

  const saveProfile = async () => {
    let photoLoad;
    if (editUser.photoURL !== user.photoURL) {
      photoLoad = true;
      await dispatch(profilePicture(editUser.photoURL, Platform.OS, setErrorM, setProgress));
    }
    if (editUser.email !== user.email) {
      await dispatch(updateEmail(editUser.email, setErrorM));
      if (!photoLoad && !errorM) navigation.navigate('Profile');
    }
    if (editUser.displayName !== user.displayName) {
      await dispatch(updateProfile(editUser, setErrorM));
      if (!photoLoad && !errorM) navigation.navigate('Profile');
    }
    if (!photoLoad) navigation.navigate('Profile');
  };

  return user && (editUser.email) ? (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <View style={styles.headContainer}>
          {!!errorM && <Text>{errorM}</Text>}
          <Title>User Profile</Title>
          <UploadImage editUser={editUser} setEditUser={setEditUser} />
          {!!progress && <Text>{`${progress}%`}</Text>}
        </View>
        <View style={styles.bodyContainer}>
          <Title>User Information</Title>
          <TextInput
            label="Name"
            mode="outlined"
            style={styles.input}
            value={editUser.displayName}
            onChangeText={(text) => setEditUser({ ...editUser, displayName: text })}
            left={<TextInput.Icon name="face-outline" />}
          />
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.input}
            value={editUser.email}
            onChangeText={(text) => setEditUser({ ...editUser, email: text })}
            left={<TextInput.Icon name="email-check-outline" />}
          />
          <TextInput
            label="Phone Number"
            mode="outlined"
            style={styles.input}
            value={editUser.phoneNumber || ''}
            onChangeText={(text) => setEditUser({ ...editUser, phoneNumber: text })}
            left={<TextInput.Icon name="file-phone-outline" />}
          />
        </View>
        <View style={styles.buttons}>
          <Button mode="outlined" onPress={saveProfile}>
            Save Changes
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <View>{!!errorM && <Text>{errorM}</Text>}</View>
  );
}

EditUserInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

EditUserInfo.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default EditUserInfo;
