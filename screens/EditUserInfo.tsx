import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Platform,
} from 'react-native';
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
  updatePassword,
  updatePhone,
} from '../redux/actions/userActions';
import styles from '../styles/UserStyles';
import UploadImage from '../components/UploadImage';
import { StateUser, DefaultRootState } from '../interfaces/state';
import { AppDispatch } from '../redux/store';
import { defaultUser } from '../redux/defaultState';

interface Props {
  navigation: {
    navigate: (page: string) => void,
  },
};

interface Password {
  newPassword: string,
  confirmNewPassword: string,
}

const EditUserInfo = ({ navigation }: Props) => {
  const [errorM, setErrorM] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();
  const user: StateUser = useSelector((state: DefaultRootState) => state.user);
  const [editUser, setEditUser] = useState<StateUser>(defaultUser);
  const [password, setPassword]= useState<Password>({ newPassword: '', confirmNewPassword: '' })

  useEffect(() => {
    if (!user.uid) dispatch(getUser());
  }, [user]);

  useEffect(() => {
    if (user) setEditUser(user);
  }, [user.uid]);

  useEffect(() => {
    if (progress === 100) {
      navigation.navigate('Profile');
      setProgress(0);
    }
  }, [progress]);

  const saveProfile = async (): Promise<any> => {
    let photoLoad;
    let error = false;
    const picture = editUser.photoURL;
    if (picture && picture !== user.photoURL) {
      photoLoad = true;
      const platform = Platform.OS;
      const picResult = await dispatch(profilePicture({picture, platform, setProgress}));
      if (picResult && picResult.payload.error) {
        setErrorM(picResult.payload.error);
        error = true;
      }
    }
    if (editUser.email && editUser.email !== user.email) {
      const emailResult = await dispatch(updateEmail(editUser.email));
      if (emailResult.payload.error) {
        setErrorM(emailResult.payload.error);
        error = true;
      }
    }
    if (editUser.displayName && editUser.displayName !== user.displayName) {
      const nameResult = await dispatch(updateProfile(editUser.displayName));
      if (nameResult.payload.error) {
        setErrorM(nameResult.payload.error);
        error = true;
      }
    }
    if (password.newPassword) {
      if (password.newPassword === password.confirmNewPassword) {
        const passwordResult = await dispatch(updatePassword(password.newPassword))
        if (passwordResult.payload.error) {
          setErrorM(passwordResult.payload.error);
          error = true;
        }
      } else {
        setErrorM('Passwords do not match!')
        error = true;
      }
    }
    if (editUser.phoneNumber && editUser.phoneNumber !== user.phoneNumber) {
      const editPhone = await dispatch(updatePhone(editUser.phoneNumber));
      if (editPhone.payload.error) {
        setErrorM(editPhone.payload.error);
        error = true;
      }
    }
    if (!photoLoad && !error) navigation.navigate('Profile');
  };

  return user && (editUser.email) ? (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <View style={styles.headContainer}>
          {!!errorM && <Text>{errorM}</Text>}
          <Title>User Profile</Title>
          <UploadImage editUser={editUser} setEditUser={setEditUser} />
          {!!progress && <Text>{`${Math.round(progress)}%`}</Text>}
        </View>
        <View style={styles.bodyContainer}>
          <Title>User Information</Title>
          <TextInput
            label="Name"
            mode="outlined"
            style={styles.input}
            value={editUser.displayName || undefined}
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
            value={editUser.phoneNumber || undefined}
            onChangeText={(text) => setEditUser({ ...editUser, phoneNumber: text })}
            left={<TextInput.Icon name="file-phone-outline" />}
          />
        <Title>Change password</Title>
          <TextInput
            label="Password"
            mode="outlined"
            style={styles.input}
            value={password.newPassword}
            onChangeText={(text) => setPassword({ ...password, newPassword: text })}
            left={<TextInput.Icon name="lock" />}
          />
          <TextInput
            label="Confirm password"
            mode="outlined"
            style={styles.input}
            value={password.confirmNewPassword}
            onChangeText={(text) => setPassword({ ...password, confirmNewPassword: text })}
            left={<TextInput.Icon name="lock" />}
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

export default EditUserInfo;
