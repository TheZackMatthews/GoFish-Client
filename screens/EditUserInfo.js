import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Title, Button, List } from 'react-native-paper';
import { getUser, getProfile } from '../redux/actions/userActions';
import { styles } from '../styles/UserStyles';

function EditUserInfo({ navigation }) {
  const [errorM, setErrorM] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // eslint-disable-next-line no-console
  console.log(user);
  useEffect(() => {
    if (!user) dispatch(getUser());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getProfile(user.uid));
    }
  }, [user]);

  const navigationFunc = (destination) => {
    navigation.navigate(destination);
  };

  return user ? (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <View style={styles.headContainer}>
          {!!errorM && <Text>{errorM}</Text>}
          <Title>User Profile</Title>
        </View>
        <View style={styles.bodyContainer}>
          <List.Section>
            <List.Subheader>Contact Information</List.Subheader>
            <List.Item
              title="Name"
              description="Kimberly Innes"
              style={{ width: 350 }}
              left={() => <List.Icon icon="face-outline" />}
            />
            <List.Item
              title="Email"
              description="kimberly.innes@gmail.com"
              left={() => <List.Icon color="#000" icon="email-check-outline" />}
            />
            <List.Item
              title="Contact Number"
              description="647-548-9852"
              left={() => <List.Icon color="#000" icon="file-phone-outline" />}
            />
          </List.Section>
        </View>
        <View style={styles.buttons}>
          <Button mode="outlined" onPress={() => navigationFunc('Profile')}>
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
