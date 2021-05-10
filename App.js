import React from 'react';
import AuthProvider from './auth'
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { Camera, SignIn, SignUp, EditUserInfo, ProjectMap, ProjectProfile, ReferenceInfo, UserMap, UserProfile} from './screens/index.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {

  console.log('App is working')
  const Stack = createStackNavigator();
 

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
      <View style={styles.container}>
        <NavigationContainer >
          <Stack.Navigator
            screenOptions={{headerShown: false }}
            initialRouteName='SignUp'>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ProjectProfile" component={ProjectProfile} />
          <Stack.Screen name="Profile" component={UserProfile} />
          <Stack.Screen name="Camera" component={Camera} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      </PaperProvider>
    </AuthProvider>
  );
}

const theme = {
  ...DefaultTheme
}

const styles = StyleSheet.create({
  container: {
    flex: 1  ,
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent(appName, () => Main);