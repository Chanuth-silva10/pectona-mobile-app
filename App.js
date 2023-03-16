import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/LoginSignupScreens/WelcomeScreen";
import SignupScreen from "./src/screens/LoginSignupScreens/SignupScreen";
import LoginScreen from "./src/screens/LoginSignupScreens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import Userprofile from "./src/screens/Userprofile";
import User1 from "./src/screens/User1";
import User2 from "./src/screens/User2";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcomepage">
        <Stack.Screen
          name="welcomepage"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="userprofile"
          component={Userprofile}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="user2"
          component={User2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="user1"
          component={User1}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
