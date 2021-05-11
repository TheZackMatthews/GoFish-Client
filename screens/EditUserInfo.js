import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Title,
  Button,
  TextInput,
} from 'react-native-paper';
import { getUser, updateProfile } from '../redux/actions/userActions';
import { defaultUser } from '../redux/defaultState';
import styles from '../styles/UserStyles';
import UploadImage from '../components/UploadImage';

function EditUserInfo({ navigation }) {
  const [errorM, setErrorM] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [editUser, setEditUser] = useState(defaultUser);

  useEffect(() => {
    if (!user) dispatch(getUser());
    if (user) setEditUser(user);
  }, [user]);

  const saveProfile = () => {
    dispatch(updateProfile(editUser, setErrorM));
    if (!errorM) navigation.navigate('Profile');
  };
  // eslint-disable-next-line no-console
  console.log(editUser);
  console.log(defaultUser);

  return user ? (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <View style={styles.headContainer}>
          {!!errorM && <Text>{errorM}</Text>}
          <Title>User Profile</Title>
          <UploadImage editUser={editUser} setEditUser={setEditUser} />
        </View>
        <View style={styles.bodyContainer}>
          <Title>User Information</Title>
          <form>
            <TextInput
              label="Name"
              mode="outlined"
              style={{ width: 350 }}
              value={editUser.displayName}
              onChangeText={(text) => setEditUser({ ...editUser, displayName: text })}
              left={<TextInput.Icon name="face-outline" />}
            />
            <TextInput
              label="Email"
              mode="outlined"
              style={{ width: 350 }}
              value={editUser.email}
              onChangeText={(text) => setEditUser({ ...editUser, email: text })}
              left={<TextInput.Icon name="email-check-outline" />}
            />
            <TextInput
              label="Phone Number"
              mode="outlined"
              style={{ width: 350 }}
              value={editUser.phoneNumber}
              onChangeText={(text) => setEditUser({ ...editUser, phoneNumber: text })}
              left={<TextInput.Icon name="file-phone-outline" />}
            />
          </form>
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
