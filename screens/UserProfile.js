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
  Title, Button, List, Avatar,
} from 'react-native-paper';
import { logOutUser, getUser } from '../redux/actions/userActions';
import styles from '../styles/UserStyles';

function UserProfile({ navigation }) {
  const [errorM, setErrorM] = useState('');

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const submitHandler = async () => {
    setErrorM('');
    const result = await dispatch(logOutUser(setErrorM));
    if (result && result.payload) {
      navigation.navigate('SignIn');
    }
  };

  const buttonHandler = (type) => {
    // eslint-disable-next-line no-console
    console.log(type);
  };

  const navigationFunc = (destination) => {
    navigation.navigate(destination);
  };

  return user ? (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <View style={styles.headContainer}>
          {!!errorM && <Text>{errorM}</Text>}
          <Title>User Profile</Title>
          {user.photoURL ? (
            <Avatar.Image source={{ uri: user.photoURL }} size={200} />
          ) : (

            <Avatar.Icon size={200} icon="camera-plus-outline" />
          )}
        </View>
        <View style={styles.bodyContainer}>
          <List.Section>
            <List.Subheader>Volunteer Information</List.Subheader>
            <List.Item
              title="Display Name"
              description={user.displayName}
              style={{ width: 350 }}
              left={() => <List.Icon icon="face-outline" />}
            />
            <List.Item
              title="Email"
              description={user.email}
              left={() => <List.Icon color="#000" icon="email-check-outline" />}
            />
            <List.Item
              title="Contact Number"
              description={user.phoneNumber || 'Not yet saved'}
              left={() => <List.Icon color="#000" icon="file-phone-outline" />}
            />
            <List.Item
              title="Account created on"
              description={user.creationTime}
              left={() => <List.Icon color="#000" icon="calendar-month" />}
            />
            <List.Item
              title="Last logged in"
              description={user.lastSignInTime}
              left={() => <List.Icon color="#000" icon="calendar-month" />}
            />
          </List.Section>
        </View>
        <View style={styles.buttons}>
          <Button mode="outlined" onPress={() => navigationFunc('EditUserInfo')}>
            Edit Info
          </Button>
          <Button mode="outlined" onPress={() => buttonHandler('preferences')}>
            Preferences
          </Button>
        </View>
        <View style={styles.bodyContainer}>
          <List.Section>
            <List.Subheader>Projects</List.Subheader>
            <List.Item
              title="Chinook Salmon Monitoring"
              style={{ width: 350 }}
              onPress={() => buttonHandler('Chinook Salmon Monitoring')}
              left={() => <List.Icon color="#000" icon="fish" />}
            />
            <List.Item
              title="Vegetation Monitoring"
              onPress={() => buttonHandler('Vegetation Monitoring')}
              left={() => <List.Icon color="#000" icon="tree-outline" />}
            />
          </List.Section>
        </View>
        <View style={styles.buttons}>
          <Button mode="outlined" onPress={() => buttonHandler('user map')}>
            User Map
          </Button>
          <Button mode="outlined" onPress={submitHandler}>
            Sign Out
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <View>{!!errorM && <Text>{errorM}</Text>}</View>
  );
}

UserProfile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

UserProfile.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default UserProfile;
