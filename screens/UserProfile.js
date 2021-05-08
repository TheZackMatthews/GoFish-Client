import React from 'react';
import { useAuth } from '../auth'
import { StyleSheet, Text, View } from 'react-native';

function UserProfile(props) {
  const context = useAuth();
  console.log(context)
  return (
    <View>
      <Text>UserProfile</Text>
    </View>
  );
}
const styles = StyleSheet.create({

})

export default UserProfile;