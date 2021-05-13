import React from 'react';
import { Provider } from 'react-redux';
import {
  AppRegistry, StyleSheet, View,
} from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { expo } from './app.json';
import {
  Fish1,
  Camera,
  SignIn,
  SignUp,
  ProjectMap,
  SpawnerProfile,
  ReferenceInfo,
  UserMap,
  UserProfile,
  FishAlive1,
  FishOrRedd,
  DayStart,
  FishDead1,
  FishDead2,
  EditUserInfo,
  Notes,
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
  const { store, persistor } = useStore({});
  console.log('App is working');
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <PaperProvider theme={theme}>
            <View style={styles.container}>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{ headerShown: false }}
                  initialRouteName="DayStart"
                >
                  <Stack.Screen name="SignIn" component={SignIn} />
                  <Stack.Screen name="SignUp" component={SignUp} />
                  <Stack.Screen name="Profile" component={UserProfile} />
                  <Stack.Screen name="EditUserInfo" component={EditUserInfo} />
                  {/* Map Pages */}
                  <Stack.Screen name="ProjectMap" component={ProjectMap} />
                  <Stack.Screen name="UserMap" component={UserMap} />
                  {/* Project Pages */}
                  <Stack.Screen name="ReferenceInfo" component={ReferenceInfo} />
                  <Stack.Screen name="SpawnerProfile" component={SpawnerProfile} />
                  {/* Camera Pages */}
                  <Stack.Screen name="Camera" component={Camera} />
                  {/* Question Pages */}
                  <Stack.Screen name="DayStart" component={DayStart} />
                  <Stack.Screen name="Notes" component={Notes} />
                  <Stack.Screen name="FishOrRedd" component={FishOrRedd} />
                  {/* Fish */}
                  <Stack.Screen name="Fish1" component={Fish1} />
                  <Stack.Screen name="FishAlive1" component={FishAlive1} />
                  {/* Fish Dead */}
                  <Stack.Screen name="FishDead1" component={FishDead1} />
                  <Stack.Screen name="FishDead2" component={FishDead2} />
                  {/* Redd */}
                </Stack.Navigator>
              </NavigationContainer>
            </View>
          </PaperProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(expo.name, () => Main);
