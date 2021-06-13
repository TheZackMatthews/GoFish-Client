import React from 'react';
import { Provider } from 'react-redux';
import {
  AppRegistry,
  View,
  LogBox,
  Platform,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { expo } from './app.json';
import screens from './screens/index';
import { useStore } from './redux/store';
import { appStyles, theme } from './styles/AppStyles';

let Main;

export default function App() {
  if (Platform.OS === 'android') {
    LogBox.ignoreLogs(['VirtualizedLists']);
  }
  const { store, persistor } = useStore({});
  console.log('App is working');
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <View style={appStyles.container}>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{ headerShown: false }}
                  initialRouteName="SignIn"
                >
                  <Stack.Screen name="SignIn" component={screens.SignIn} />
                  <Stack.Screen name="SignUp" component={screens.SignUp} />
                  <Stack.Screen name="Profile" component={screens.UserProfile} />
                  <Stack.Screen name="EditUserInfo" component={screens.EditUserInfo} />
                  <Stack.Screen name="Preferences" component={screens.Preferences} />
                  {/* Map Pages */}
                  <Stack.Screen name="ProjectMap" component={screens.ProjectMap} />
                  <Stack.Screen name="UserMap" component={screens.UserMap} />
                  {/* Project Pages */}
                  <Stack.Screen name="ReferenceInfo" component={screens.ReferenceInfo} />
                  <Stack.Screen name="SpawnerProfile" component={screens.SpawnerProfile} />
                  {/* Camera Pages */}
                  <Stack.Screen name="Camera" component={screens.Camera} />
                  {/* Question Pages */}
                  <Stack.Screen name="DayStart" component={screens.DayStart} />
                  <Stack.Screen name="Notes" component={screens.Notes} />
                  <Stack.Screen name="FishOrRedd" component={screens.FishOrRedd} />
                  {/* Fish */}
                  <Stack.Screen name="Fish1" component={screens.Fish1} />
                  <Stack.Screen name="FishAlive1" component={screens.FishAlive1} />
                  {/* Fish Dead */}
                  <Stack.Screen name="FishDead1" component={screens.FishDead1} />
                  <Stack.Screen name="FishDead2" component={screens.FishDead2} />
                  {/* Redd */}
                  <Stack.Screen name="Redd1" component={screens.Redd1} />
                  <Stack.Screen name="Redd2" component={screens.Redd2} />
                  {/* Live Salmon Tree */}
                  <Stack.Screen name="LiveSalmon1" component={screens.LiveSalmon1} />
                  <Stack.Screen name="LiveSalmonY" component={screens.LiveSalmonY} />
                  <Stack.Screen name="LiveSalmonYY" component={screens.LiveSalmonYY} />
                  <Stack.Screen name="LiveSalmonN" component={screens.LiveSalmonN} />
                  <Stack.Screen name="LiveSalmonNY" component={screens.LiveSalmonNY} />
                  <Stack.Screen name="LiveSalmonNYY" component={screens.LiveSalmonNYY} />
                  <Stack.Screen name="LiveSalmonYN" component={screens.LiveSalmonYN} />
                  <Stack.Screen name="LiveSalmonNN" component={screens.LiveSalmonNN} />
                  <Stack.Screen name="LiveSalmonNYN" component={screens.LiveSalmonNYN} />
                  <Stack.Screen name="LiveSalmonNYNY" component={screens.LiveSalmonNYNY} />
                  <Stack.Screen name="LiveSalmonNYNN" component={screens.LiveSalmonNYNN} />
                  <Stack.Screen name="LiveSalmonNNY" component={screens.LiveSalmonNNY} />
                  <Stack.Screen name="LiveSalmonNNN" component={screens.LiveSalmonNNN} />
                  {/* Dead Salmon Tree */}
                  <Stack.Screen name="DeadSalmon1" component={screens.DeadSalmon1} />
                  <Stack.Screen name="DeadSalmonY" component={screens.DeadSalmonY} />
                  <Stack.Screen name="DeadSalmonN" component={screens.DeadSalmonN} />
                  <Stack.Screen name="DeadSalmonU" component={screens.DeadSalmonU} />
                  <Stack.Screen name="DeadSalmonYN" component={screens.DeadSalmonYN} />
                  <Stack.Screen name="DeadSalmonYY" component={screens.DeadSalmonYY} />
                  <Stack.Screen name="DeadSalmonNN" component={screens.DeadSalmonNN} />
                  <Stack.Screen name="DeadSalmonUNN" component={screens.DeadSalmonUNN} />
                  <Stack.Screen name="DeadSalmonUN" component={screens.DeadSalmonUN} />
                  <Stack.Screen name="DeadSalmonUNY" component={screens.DeadSalmonUNY} />
                  <Stack.Screen name="DeadSalmonUNNY" component={screens.DeadSalmonUNNY} />
                  <Stack.Screen name="DeadSalmonUNYN" component={screens.DeadSalmonUNYN} />
                  <Stack.Screen name="DeadChinook" component={screens.DeadChinook} />
                  <Stack.Screen name="DeadChum" component={screens.DeadChum} />
                  <Stack.Screen name="DeadCoho" component={screens.DeadCoho} />
                  <Stack.Screen name="DeadPink" component={screens.DeadPink} />
                  <Stack.Screen name="DeadSockeye" component={screens.DeadSockeye} />
                  <Stack.Screen name="Unknown" component={screens.Unknown} />

                  <Stack.Screen name="TestTree" component={screens.TestTree} />

                </Stack.Navigator>
              </NavigationContainer>
            </View>
          </PaperProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(expo.name, () => Main);
