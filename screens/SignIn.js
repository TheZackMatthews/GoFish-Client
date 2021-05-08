import React, { useState } from "react";
import { firebaseClient } from "../auth/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  renderForm,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants/theme";
import images from "../images";

function SignIn() {
  firebaseClient();
  const showPassword = false;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorM, setErrorM] = useState(null);

  const submitHandler = async (e) => {
      try {
        firebase.auth().signInWithEmailAndPassword(email, password)
        setEmail('');
        setPassword('');
      } catch(error) {
          setErrorM(error.message)
      }
  }

  function renderForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding * 3,
        }}
      >
        {/* Username */}
        <View style={{ marginTop: SIZES.padding * 3 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Email
          </Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            defaultValue={email}
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Email"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
          />
        </View>

        {/* Password */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Password
          </Text>
          <TextInput
            onChangeText={text => setPassword(text)}
            defaultValue={password}
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Password"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 0,
              bottom: 10,
              height: 30,
              width: 30,
            }}
            // onPress={() => setShowPassword(!showPassword)}
          >
            {/* <Image
                        source={showPassword ? icons.disable_eye : icons.eye}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.white
                        }}
                    /> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{ margin: SIZES.padding * 3 }}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: COLORS.black,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            marginTop: SIZES.padding * 5,
          }}
          onPress={() => console.log("sign in...")}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderSignUpLink() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding * 2,
        }}
        onPress={() => console.log("Sign Up")}
      >
        <Text
          style={{ alignSelf: "flex-end", color: COLORS.black, ...FONTS.h4 }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <View style={styles.headContainer}>
          <Text style={styles.firstHeader}>GO Fish</Text>
          <Image source={images.logo} style={styles.logo} />
          <Text style={styles.signIn}>Sign In</Text>
        </View>
        {renderForm()}
        {renderButton()}
        {renderSignUpLink()}
      </ScrollView>

      {/* {renderAreaCodesModal()} */}
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lime,
  },
  headContainer: {
    alignItems: "center",
  },
  firstHeader: {
    marginBottom: SIZES.padding,
    color: COLORS.lightGreen,
    fontSize: SIZES.largeTitle,
    marginTop: SIZES.padding * 4,
  },
  logo: {
    width: 60,
    height: 60,
  },
  signIn: {
    marginTop: SIZES.padding * 5,
    color: COLORS.lightGreen,
    fontSize: SIZES.h1,
  },
});

export default SignIn;
