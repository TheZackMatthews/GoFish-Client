import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import GoFishLogo from '../components/GoFishLogo';
import styles from '../styles/FormStyles';
import { logInUser } from '../redux/actions/userActions';

function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const showPassword = false;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorM, setErrorM] = useState('');

  const submitHandler = async () => {
    setEmail('');
    setPassword('');
    const result = await dispatch(logInUser(email, password, setErrorM));
    if (result && result.payload) {
      navigation.navigate('Profile');
    }
  };

  function renderForm() {
    return (
      <View style={styles.outsideView}>
        <View style={styles.view}>
          {!!errorM && <Text>{errorM}</Text>}
          <TextInput
            onChangeText={(text) => setEmail(text.trim())}
            value={email}
            label="Email"
          />
        </View>

        <View style={styles.view}>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            label="Password"
            secureTextEntry={!showPassword}
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
          Sign In
        </Button>
      </View>
    );
  }

  function renderSignUpLink() {
    return (
      <View style={styles.submitView}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('SignUp')}
        >
          Create Account
        </Button>
      </View>
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

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

SignIn.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default SignIn;
