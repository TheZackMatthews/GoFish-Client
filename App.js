import React from 'react';
import { Provider } from 'react-redux';
import {
  AppRegistry, StyleSheet, View,
} from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { name as appName } from './app.json';
import {
  Fish1,
  Camera,
  SignIn,
  SignUp,
  EditUserInfo,
  ProjectMap,
  ProjectProfile,
  ReferenceInfo,
  UserMap,
  UserProfile,
  FishAlive1,
  FishAlive2,
} from './screens/index';
import { useStore } from './redux/store';
import AuthProvider from './auth';

let Main;
const theme = {
  ...DefaultTheme,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default function App() {
  const store = useStore({});

  // eslint-disable-next-line no-console
  console.log('App is working');
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <AuthProvider>
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="SignUp"
              >
                <Stack.Screen name="EditUserInfo" component={EditUserInfo} />
                <Stack.Screen name="ReferenceInfo" component={ReferenceInfo} />
                <Stack.Screen name="UserMap" component={UserMap} />
                <Stack.Screen name="FishAlive1" component={FishAlive1} />
                <Stack.Screen name="FishAlive2" component={FishAlive2} />
                <Stack.Screen name="Fish1" component={Fish1} />
                <Stack.Screen name="ProjectMap" component={ProjectMap} />
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
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
