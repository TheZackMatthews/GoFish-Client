import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {SignIn, SignUp, EditUserInfo, ProjectMap, ProjectProfile, ReferenceInfo, UserMap, UserProfile} from './screens/index.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {

  console.log('App is working')
  const Stack = createStackNavigator();

  return (
  <View style={styles.container}>
    <NavigationContainer >
       
      <Stack.Navigator 
      screenOptions={{headerShown: false }}
                initialRouteName='SignIn'>
      <Stack.Screen name="SignIn" component={SignIn} />
      {/* <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ProjectProfile" component={ProjectProfile} /> */}
    </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1  ,
    justifyContent: 'center',   
  },
});
