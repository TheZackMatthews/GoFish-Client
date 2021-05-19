import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Title, Button, List, Avatar,
  useTheme,
} from 'react-native-paper';
import { logOutUser, getUser } from '../redux/actions/userActions';
import styles from '../styles/UserStyles';
import { SIZES } from '../constants/theme';

function UserProfile({ navigation }) {
  const [errorM, setErrorM] = useState('');
  const theme = useTheme();
  console.log(theme);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const cache = useSelector((state) => state.cache);

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

  const navigationFunc = (destination) => {
    navigation.navigate(destination);
  };

  const renderData = () => cache.map((visit) => ({
    id: visit.group_id,
  }));

  const Item = ({ id }) => (
    <View style={{ marginHorizontal: 15 }}>
      <Text style={{ fontWeight: '500' }}>
        {` Fish status: ${id}`}
      </Text>
    </View>
  );

  Item.propTypes = {
    id: PropTypes.string,
  };

  Item.defaultProps = {
    id: '',
  };

  const renderItem = ({ item }) => (
    <Item
      id={item.id}
    />
  );

  return user ? (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <View style={styles.headContainer}>
          {!!errorM && <Text>{errorM}</Text>}
          <Title
            style={{ fontSize: 25, color: theme.colors.primary, fontWeight: 'bold' }}
          >
            User Profile
          </Title>
          {user.photoURL ? (
            <Avatar.Image source={{ uri: user.photoURL }} size={200} />
          ) : (

            <Avatar.Icon size={200} icon="camera-plus-outline" />
          )}
        </View>
        <View>
          <List.Section>
            <List.Subheader
              style={{ fontSize: 20, color: theme.colors.accent, fontWeight: 'bold' }}
            >
              Volunteer Information
            </List.Subheader>
            <List.Item
              title="Display Name"
              // titleStyle={{ fontSize }}
              description={user.displayName}
              // descriptionStyle={{ fontSize: fontSize - 2 }}
              style={{ width: SIZES.width * 0.8 }}
              left={() => (
                <List.Icon
                  color={theme.colors.primary}
                  icon="face-outline"
                />
              )}
            />
            <List.Item
              title="Email"
              description={user.email}
              left={() => <List.Icon color={theme.colors.primary} icon="email-check-outline" />}
            />
            <List.Item
              title="Contact Number"
              description={user.phoneNumber || 'Not yet saved'}
              left={() => <List.Icon color={theme.colors.primary} icon="file-phone-outline" />}
            />
            <List.Item
              title="Account created on"
              description={user.creationTime}
              left={() => <List.Icon color={theme.colors.primary} icon="calendar-month" />}
            />
            <List.Item
              title="Last logged in"
              description={user.lastSignInTime}
              left={() => <List.Icon color={theme.colors.primary} icon="calendar-month" />}
            />
          </List.Section>
        </View>
        <View style={styles.buttons}>
          <Button
            mode="contained"
            onPress={() => navigationFunc('EditUserInfo')}
            labelStyle={{ fontWeight: 'bold' }}
            color={theme.colors.light}
          >
            Edit Info
          </Button>
          <Button
            onPress={() => navigationFunc('Preferences')}
            mode="contained"
            labelStyle={{ fontWeight: 'bold' }}
            color={theme.colors.light}
          >
            Preferences
          </Button>
        </View>
        {cache && (cache.length > 0)
            && (
            <>
              <Title>Unsubmitted Reports</Title>
              <FlatList
                data={renderData()}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </>
            )}
        <View style={styles.bodyContainer}>
          <List.Section>
            <List.Subheader
              style={{ fontSize: 20, color: theme.colors.accent, fontWeight: 'bold' }}
            >
              Projects
            </List.Subheader>
            <List.Item
              title="Chinook Salmon Monitoring"
              style={{ width: 350 }}
              onPress={() => navigationFunc('DayStart')}
              left={() => <List.Icon color={theme.colors.primary} icon="fish" />}
            />
            <List.Item
              title="Vegetation Monitoring"
              onPress={() => navigationFunc('Profile')}
              left={() => <List.Icon color={theme.colors.primary} icon="tree-outline" />}
            />
          </List.Section>
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() => navigationFunc('Profile')}
            mode="contained"
            labelStyle={{ fontWeight: 'bold' }}
            color={theme.colors.light}
          >
            User Map
          </Button>
          <Button
            onPress={() => navigationFunc('Camera')}
            mode="contained"
            labelStyle={{ fontWeight: 'bold' }}
            color={theme.colors.light}
          >
            Camera
          </Button>
          <Button
            onPress={submitHandler}
            mode="contained"
            labelStyle={{ fontWeight: 'bold' }}
            color={theme.colors.light}
          >
            Sign Out
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <View style={{ margin: 100 }}>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('SignIn')}
      >
        Sign In.
      </Button>
    </View>
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
