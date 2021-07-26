import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import GoFishLogo from '../components/GoFishLogo';
import styles from '../styles/FormStyles';
import { logInUser, sendPasswordReset } from '../redux/actions/userActions';
import { AppDispatch } from '../redux/store';


interface Props {
  navigation: {
    navigate: (page: string) => void
  },
}

const SignIn = ({ navigation }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorM, setErrorM] = useState<string>('');

  const submitHandler = async (): Promise<void> => {
    setEmail('');
    setPassword('');
    const result = await dispatch(logInUser({email, password}));
    if (result.payload.error) {
      setErrorM(result.payload.error);
    } else navigation.navigate('Profile');
  };

  const newPasswordHandler = async () => {
    const result = await dispatch(sendPasswordReset(email))
    if (result.payload.message) {
      setErrorM(result.payload.message);
    } else if (result.payload.error) {
      setErrorM(result.payload.error);
    }
  }

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <GoFishLogo title="Sign in" />
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
            secureTextEntry={true}
          />
        </View>
      </View>
        <View style={styles.submitView}>
        <Button
          mode="contained"
          onPress={submitHandler}
        >
          Sign In
        </Button>
      </View>
        <View style={styles.submitView}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('SignUp')}
        >
          Create Account
        </Button>
      </View>
      <View style={styles.submitView}>
        <Button
          mode="outlined"
          onPress={newPasswordHandler}
        >
          Reset password
        </Button>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignIn;
