import React, { useState } from 'react';
import { useAuth } from '../auth'
import { firebaseClient } from '../auth/firebaseClient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";

function UserProfile({navigation}) {
  firebaseClient();
  const [ errorM, setErrorM ] = useState('');
  const { user } = useAuth();

  const submitHandler = async () => {
    try {
      setErrorM('');
      await firebase.auth().signOut();
      navigation.navigate('SignIn')
    } catch (error) {
      setErrorM(error.message)
    }
  }

  return (
    user ? (
      <View>
        {!!errorM && <Text>{errorM}</Text>}
        <Text>UserProfile</Text>
        <TouchableOpacity
          onPress={submitHandler}
        >
          <Text>Button</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View>
        {!!errorM && <Text>{errorM}</Text>}
      </View>
    )
  );
}
const styles = StyleSheet.create({

})

export default UserProfile;