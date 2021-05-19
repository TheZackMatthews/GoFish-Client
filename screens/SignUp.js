import React, { useState } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { createUser, updateProfile } from '../redux/actions/userActions';
import GoFishLogo from '../components/GoFishLogo';
import styles from '../styles/FormStyles';

function SignUp({ navigation }) {
  const [signUp, setSignUp] = useState('');
  const [errorM, setErrorM] = useState('');
  const showPassword = false;
  const dispatch = useDispatch();

  const nameChange = (text) => {
    setErrorM('');
    setSignUp({ ...signUp, name: text });
  };

  const emailChange = (text) => {
    setErrorM('');
    setSignUp({ ...signUp, email: text });
  };

  const passwordChange = (text) => {
    setErrorM('');
    setSignUp({ ...signUp, password: text });
  };

  const passwordConfirmChange = (text) => {
    setErrorM('');
    setSignUp({ ...signUp, confirmPassword: text });
  };

  const submitHandler = async () => {
    const { password, confirmPassword } = signUp;
    setErrorM('');
    if (password !== confirmPassword) {
      setErrorM('Passwords do not match.');
      return;
    }
    const result = await dispatch(createUser(signUp, setErrorM));
    await dispatch(updateProfile({ displayName: signUp.name }, setErrorM));
    if (result && result.payload) {
      navigation.navigate('Profile');
    }
  };

  function renderForm() {
    return (
      <View style={styles.outsideView}>
        <View style={styles.view}>
          {!!errorM && <Text>{errorM}</Text>}
          <TextInput onChangeText={nameChange} label="Full name" />
        </View>
        <View style={styles.view}>
          <TextInput onChangeText={emailChange} label="Email" />
        </View>

        <View style={styles.view}>
          <TextInput
            onChangeText={passwordChange}
            secureTextEntry={!showPassword}
            label="Password"
          />
        </View>

        <View style={styles.view}>
          <TextInput
            onChangeText={passwordConfirmChange}
            secureTextEntry={!showPassword}
            label="Confirm password"
          />
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={styles.submitView}>
        <Button
          mode="contained"
          onPress={submitHandler}
        >
          Sign Up
        </Button>
      </View>
    );
  }

  function renderSignInLink() {
    return (
      <View style={styles.submitView}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('SignIn')}
        >
          Already have an account? Log in.
        </Button>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <GoFishLogo title="Sign Up" />
        {renderForm()}
        {renderButton()}
        {renderSignInLink()}
      </ScrollView>

      {/* {renderAreaCodesModal()} */}
    </KeyboardAvoidingView>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

SignUp.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default SignUp;
