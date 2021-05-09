import React, { useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  renderForm,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput } from 'react-native-paper';
import { COLORS, SIZES, FONTS } from "../constants/theme";
import images from "../images";
import { styles } from '../styles/FormsStyles'
import { firebaseClient } from '../auth/firebaseClient';
import firebase from 'firebase/app';
import 'firebase/auth';

function SignUp({navigation}) {
    firebaseClient();
  const [ signUp, setSignUp ] = useState("");
  const [ errorM, setErrorM ] = useState('');
  const showPassword = false;

  const nameChange = (text) => {
    setErrorM('');
      setSignUp({ ...signUp, name: text })
  }

  const emailChange = (text) => {
      setErrorM('');
      setSignUp({ ...signUp, email: text })
  }

  const passwordChange = (text) => {
    setErrorM('');
      setSignUp({ ...signUp, password: text })
  }

  const passwordConfirmChange = (text) => {
    setErrorM('');
      setSignUp({ ...signUp, confirmPassword: text })
  }

  const submitHandler = async () => {
    const { name, email, password, confirmPassword } = signUp;
    setErrorM('');
    if (password !== confirmPassword) {
        setErrorM('Passwords do not match.')
        return;
    }
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        // send UID to database
        navigation.navigate('Profile')
    } catch (error) {
        setErrorM(error.message)
    }
  }

  console.log(signUp)
  function renderForm() {
    return (
      <View style={styles.outsideView}>
        <View style={styles.view}>
            {!!errorM && <Text>{errorM}</Text>}
          <TextInput
            onChangeText={nameChange}
            label="Full name"
          />
        </View>
        <View style={styles.view}>
          <TextInput
            onChangeText={emailChange}
            label="Email"
          />
        </View>

        <View style={styles.view}>
          <TextInput
          onChangeText={passwordChange}
            secureTextEntry={!showPassword}
            label="Password"
          />
          <TouchableOpacity
            style={styles.button}
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

        <View style={styles.view}>
          <TextInput
          onChangeText={passwordConfirmChange}
            secureTextEntry={!showPassword}
            label="Confirm password"
          />
          <TouchableOpacity
            style={styles.button}
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
          style={styles.submitButton}
          onPress={submitHandler}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderSignInLink() {
    return (
      <TouchableOpacity
        style={styles.signInLink}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.textP}>
          Already have an account? Log in.
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
          <Text style={styles.signUp}>Sign Up</Text>
        </View>
        {renderForm()}
        {renderButton()}
        {renderSignInLink()}
      </ScrollView>

      {/* {renderAreaCodesModal()} */}
    </KeyboardAvoidingView>
  );
}

export default SignUp;
