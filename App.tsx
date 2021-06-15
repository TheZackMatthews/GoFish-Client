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
import { initialState } from './redux/defaultState';

let Main: any;

const App = () => {
  if (Platform.OS === 'android') {
    LogBox.ignoreLogs(['VirtualizedLists']);
  }
  const { store, persistor } = useStore(initialState);
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
                  initialRouteName="TestTree"
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
                  <Stack.Screen name="SpawnerProfile" component={screens.SpawnerProfile} />
                  {/* Camera Pages */}
                  <Stack.Screen name="Camera" component={screens.Camera} />
                  {/* Question Pages */}
                  <Stack.Screen name="DayStart" component={screens.DayStart} />
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

export default App;

AppRegistry.registerComponent(expo.name, () => Main);
