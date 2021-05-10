import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { firebaseClient } from "../auth/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput } from 'react-native-paper';
import GoFishLogo from '../components/GoFishLogo';
import { COLORS, SIZES, FONTS } from "../constants/theme";
import { styles } from '../styles/FormsStyles'
import { logInUser } from '../redux/actions/userActions'

function SignIn({navigation}) {
  firebaseClient();
  const dispatch = useDispatch();
  const showPassword = false;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorM, setErrorM] = useState('');

  const submitHandler = async (e) => {

    let result = await dispatch(logInUser(email, password))
    // let result = await firebase.auth().signInWithEmailAndPassword(email, password)
        // console.log(result)
    setEmail('');
    setPassword('');
    navigation.navigate('Profile')
    if (result) {
      setErrorM(result)
      throw new Error(error.message)
    }
    
  }

  function renderForm() {
    return (
      <View style={styles.outsideView}>
        <View style={styles.view}>
        {!!errorM && <Text>{errorM}</Text>}
          <TextInput
            onChangeText={(text) => setEmail(text)}
            defaultValue={email}
            label="Email"
          />
        </View>

        <View style={styles.view}>
          <TextInput
            onChangeText={text => setPassword(text)}
            defaultValue={password}
            label="Password"
            secureTextEntry={!showPassword}
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
      <View style={styles.submitView}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitHandler}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderSignUpLink() {
    return (
      <TouchableOpacity
        style={styles.signInLink}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.textP}>
          Create Account
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <GoFishLogo title="Sign in" />
        {renderForm()}
        {renderButton()}
        {renderSignUpLink()}
      </ScrollView>

      {/* {renderAreaCodesModal()} */}
    </KeyboardAvoidingView>
  );
}

export default SignIn;
