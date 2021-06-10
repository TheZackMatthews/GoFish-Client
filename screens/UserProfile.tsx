import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  FlatList,
} from 'react-native';
import {
  Title, Button, List, Avatar,
  useTheme,
} from 'react-native-paper';
import { logOutUser, getUser } from '../redux/actions/userActions';
import styles from '../styles/UserStyles';
import { SIZES } from '../constants/theme';
import { AppDispatch } from '../redux/store';
import { StateUser, DefaultRootState, StateVisit } from '../interfaces/state';

interface Props {
  navigation: {
    navigate: (page: string) => void
  },
}

interface ITheme {
  colors: {
    accent: string,
    primary: string,
    light?: string,
  }
}

const UserProfile = ({ navigation }: Props) => {
  const [errorM, setErrorM] = useState<string>('');
  const theme: ITheme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const user: StateUser = useSelector((state: DefaultRootState) => state.user);
  const cache: any[] = useSelector((state: DefaultRootState) => state.cache);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const submitHandler = async (): Promise<any> => {
    setErrorM('');
    const result = await dispatch(logOutUser(setErrorM));
    if (result && result.payload) {
      navigation.navigate('SignIn');
    }
  };

  const navigationFunc = (destination: string): void => {
    navigation.navigate(destination);
  };

  const renderData = () => cache.map((visit: StateVisit) => ({
    id: visit.group_id,
  }));

  interface Iid {
    id: string,
  }
  const Item = ({ id }: Iid) => (
    <View style={{ marginHorizontal: 15 }}>
      <Text style={{ fontWeight: '500' }}>
        {` Fish status: ${id}`}
      </Text>
    </View>
  );

  interface Iitem {
    item: {
      id: string,
    }
  }

  const renderItem = ({ item }: Iitem) => (
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
            style={{ fontSize: 25, color: theme.colors.accent, fontWeight: 'bold' }}
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
            style={{ width: SIZES.width * 0.4 }}
            mode="contained"
            onPress={() => navigationFunc('EditUserInfo')}
            labelStyle={{ fontWeight: 'bold' }}
            color={theme.colors.light}
          >
            Edit Info
          </Button>
          <Button
            style={{ width: SIZES.width * 0.4 }}
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
            style={{ width: SIZES.width / 3, marginBottom: 20 }}
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

export default UserProfile;
