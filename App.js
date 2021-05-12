import React from "react";
import { Provider } from "react-redux";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { name as appName } from "./app.json";
import {
  Fish1,
  Camera,
  SignIn,
  SignUp,
  EditUserInfo,
  ProjectMap,
  ChinookProfile,
  ReferenceInfo,
  UserMap,
  UserProfile,
  FishAlive1,
  FishAlive2,
  FishOrRedd,
  DayStart,
  FishDead1,
  FishDead2,
} from './screens/index';
import { useStore } from './redux/store';
import AuthProvider from './auth';

let Main;
const theme = {
  ...DefaultTheme,
};

import { useStore } from "./redux/store";
import AuthProvider from "./auth";

export default function App() {
  const store = useStore({});

  console.log("App is working");
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <AuthProvider>
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="FishAlive1"
              >
                <Stack.Screen name="Fish1" component={Fish1} />
                <Stack.Screen name="ProjectMap" component={ProjectMap} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen
                  name="ProjectProfile"
                  component={ProjectProfile}
                />
                <Stack.Screen name="Profile" component={UserProfile} />
                {/* Map Pages */}
                <Stack.Screen name="ProjectMap" component={ProjectMap} />
                <Stack.Screen name="UserMap" component={UserMap} />
                {/* Project Pages */}
                <Stack.Screen name="ReferenceInfo" component={ReferenceInfo} />
                <Stack.Screen name="ChinookProfile" component={ChinookProfile} />
                {/* Camera Pages */}
                <Stack.Screen name="Camera" component={Camera} />
                {/* Question Pages */}
                <Stack.Screen name="DayStart" component={DayStart} />
                <Stack.Screen name="FishOrRedd" component={FishOrRedd} />
                {/* Fish */}
                <Stack.Screen name="Fish1" component={Fish1} />
                <Stack.Screen name="FishAlive1" component={FishAlive1} />
                <Stack.Screen name="FishAlive2" component={FishAlive2} />
                {/* Fish Dead */}
                <Stack.Screen name="FishDead1" component={FishDead1} />
                <Stack.Screen name="FishDead2" component={FishDead2} />
                {/* Redd */}
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </PaperProvider>
      </AuthProvider>
    </Provider>
  );
}

const theme = {
  ...DefaultTheme,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

AppRegistry.registerComponent(appName, () => Main);
