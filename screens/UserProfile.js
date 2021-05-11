import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, getUser } from "../redux/actions/userActions";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Title, Button, List } from "react-native-paper";
import { styles } from "../styles/UserStyles";

function UserProfile({ navigation }) {
  const [errorM, setErrorM] = useState("");
  
  const dispatch = useDispatch();
  
  const user = useSelector(state => state.user)
  console.log(user)
  useEffect(() => {
    if (!user) dispatch(getUser())
  },[])

  const submitHandler = async () => {
    setErrorM("");
    let result = await dispatch(logOutUser(setErrorM));
    console.log(result)
    if (result && result.payload) {
      navigation.navigate("SignIn");
    }
  };

  const buttonHandler = (type) => {
    console.log(type)
  }


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
          <Button mode="outlined" onPress={() => buttonHandler('edit info')}>
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
              style={{width: 350}}
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

export default UserProfile;
