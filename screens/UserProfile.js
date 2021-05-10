import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../redux/actions/userActions";
import { useAuth } from "../auth";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Title, Button, List } from "react-native-paper";
import { styles } from "../styles/UserStyles";

function UserProfile({ navigation }) {
  const [errorM, setErrorM] = useState("");
  const { user } = useAuth();
  const dispatch = useDispatch();

  const submitHandler = async () => {
    setErrorM("");
    let result = await dispatch(logOutUser(setErrorM));

    if (result && result.payload) {
      navigation.navigate("SignIn");
    }
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
              style={{width: 350}}
              onPress={() => console.log('prssed')}
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
          <Button mode="outlined" onPress={submitHandler}>
            Edit Info
          </Button>
          <Button mode="outlined" onPress={submitHandler}>
            Preferences
          </Button>
        </View>
          <View style={styles.bodyContainer}>
          <List.Section>
            <List.Subheader>Projects</List.Subheader>
            <List.Item
              title="Chinook Salmon Monitoring"
              style={{width: 350}}
              onPress={() => console.log('prssed')}
              left={() => <List.Icon color="#000" icon="fish" />}
            />
            <List.Item
              title="Vegetation Monitoring"
              left={() => <List.Icon color="#000" icon="tree-outline" />}
            />
          </List.Section>
          </View>
          <View style={styles.buttons}>
          <Button mode="outlined" onPress={submitHandler}>
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

export default UserProfile;
