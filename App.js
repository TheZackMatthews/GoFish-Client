import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, StyleSheet, View } from 'react-native';
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
  EditUserInfo,
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
  Notes,
  Redd1,
  Redd2,
  LiveSalmon1,
  LiveSalmonY,
  LiveSalmonYY,
  LiveSalmonN,
  LiveSalmonNY,
  LiveSalmonNYY,
  LiveSalmonYN,
  LiveSalmonNN,
  LiveSalmonNYN,
  LiveSalmonNYNY,
  LiveSalmonNYNN,
  LiveSalmonNNY,
  LiveSalmonNNN,
  DeadSalmon1,
  DeadSalmonY,
  DeadSalmonN,
  DeadSalmonU,
  DeadSalmonYN,
  DeadSalmonYY,
  DeadSalmonNN,
  DeadSalmonUNN,
  DeadSalmonUN,
  DeadSalmonUNY,
  DeadSalmonUNNY,
  DeadSalmonUNYN,
  DeadChinook,
  DeadChum,
  DeadCoho,
  DeadPink,
  DeadSockeye,
  Unknown,
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
                  initialRouteName="SignIn"
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
                  <Stack.Screen name="Redd1" component={Redd1} />
                  <Stack.Screen name="Redd2" component={Redd2} />
                  {/* Live Salmon Tree */}
                  <Stack.Screen name="LiveSalmon1" component={LiveSalmon1} />
                  <Stack.Screen name="LiveSalmonY" component={LiveSalmonY} />
                  <Stack.Screen name="LiveSalmonYY" component={LiveSalmonYY} />
                  <Stack.Screen name="LiveSalmonN" component={LiveSalmonN} />
                  <Stack.Screen name="LiveSalmonNY" component={LiveSalmonNY} />
                  <Stack.Screen name="LiveSalmonNYY" component={LiveSalmonNYY} />
                  <Stack.Screen name="LiveSalmonYN" component={LiveSalmonYN} />
                  <Stack.Screen name="LiveSalmonNN" component={LiveSalmonNN} />
                  <Stack.Screen name="LiveSalmonNYN" component={LiveSalmonNYN} />
                  <Stack.Screen name="LiveSalmonNYNY" component={LiveSalmonNYNY} />
                  <Stack.Screen name="LiveSalmonNYNN" component={LiveSalmonNYNN} />
                  <Stack.Screen name="LiveSalmonNNY" component={LiveSalmonNNY} />
                  <Stack.Screen name="LiveSalmonNNN" component={LiveSalmonNNN} />
                  {/* Dead Salmon Tree */}
                  <Stack.Screen name="DeadSalmon1" component={DeadSalmon1} />
                  <Stack.Screen name="DeadSalmonY" component={DeadSalmonY} />
                  <Stack.Screen name="DeadSalmonN" component={DeadSalmonN} />
                  <Stack.Screen name="DeadSalmonU" component={DeadSalmonU} />
                  <Stack.Screen name="DeadSalmonYN" component={DeadSalmonYN} />
                  <Stack.Screen name="DeadSalmonYY" component={DeadSalmonYY} />
                  <Stack.Screen name="DeadSalmonNN" component={DeadSalmonNN} />
                  <Stack.Screen name="DeadSalmonUNN" component={DeadSalmonUNN} />
                  <Stack.Screen name="DeadSalmonUN" component={DeadSalmonUN} />
                  <Stack.Screen name="DeadSalmonUNY" component={DeadSalmonUNY} />
                  <Stack.Screen name="DeadSalmonUNNY" component={DeadSalmonUNNY} />
                  <Stack.Screen name="DeadSalmonUNYN" component={DeadSalmonUNYN} />
                  <Stack.Screen name="DeadChinook" component={DeadChinook} />
                  <Stack.Screen name="DeadChum" component={DeadChum} />
                  <Stack.Screen name="DeadCoho" component={DeadCoho} />
                  <Stack.Screen name="DeadPink" component={DeadPink} />
                  <Stack.Screen name="DeadSockeye" component={DeadSockeye} />
                  <Stack.Screen name="Unknown" component={Unknown} />

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
