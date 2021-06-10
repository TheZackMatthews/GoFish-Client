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
import { AppDispatch } from '../redux/store';

interface Props {
  navigation: {
    navigate: (page: string) => void
  },
}

interface SignUpProps {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

const defaultSignUp = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUp = ({ navigation }: Props) => {
  const [signUp, setSignUp] = useState<SignUpProps>(defaultSignUp);
  const [errorM, setErrorM] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();

  const nameChange = (text: string): void => {
    setErrorM('');
    setSignUp({ ...signUp, name: text });
  };

  const emailChange = (text: string): void => {
    setErrorM('');
    setSignUp({ ...signUp, email: text });
  };

  const passwordChange = (text: string): void => {
    setErrorM('');
    setSignUp({ ...signUp, password: text });
  };

  const passwordConfirmChange = (text: string): void => {
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
    const result = await dispatch(createUser(signUp));
    await dispatch(updateProfile(signUp.name));
    if (result.payload.error) {
      setErrorM(result.payload.error);
    } else {
      navigation.navigate('Profile');
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <GoFishLogo title="Sign Up" />
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
            secureTextEntry={true}
            label="Password"
          />
        </View>

        <View style={styles.view}>
          <TextInput
            onChangeText={passwordConfirmChange}
            secureTextEntry={true}
            label="Confirm password"
          />
        </View>
      </View>
        <View style={styles.submitView}>
        <Button
          mode="contained"
          onPress={submitHandler}
        >
          Sign Up
        </Button>
      </View>
        <View style={styles.submitView}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('SignIn')}
        >
          Already have an account? Log in.
        </Button>
      </View>
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
