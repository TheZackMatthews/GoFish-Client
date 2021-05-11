import React, { useState } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { createUser } from '../redux/actions/userActions';
import GoFishLogo from '../components/GoFishLogo';
import { styles } from '../styles/FormsStyles';

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
      <View style={styles.submitView}>
        <TouchableOpacity style={styles.submitButton} onPress={submitHandler}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderSignInLink() {
    return (
      <TouchableOpacity
        style={styles.signInLink}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.textP}>Already have an account? Log in.</Text>
      </TouchableOpacity>
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
