import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/LoginSignupScreens/WelcomeScreen";
import SignupScreen from "./src/screens/LoginSignupScreens/SignupScreen";
import LoginScreen from "./src/screens/LoginSignupScreens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import Userprofile from "./src/screens/Userprofile";
import PetList from "./src/screens/PetScreens/PetList";
import WalletManagement from "./src/screens/walletManagement/WalletManagement";
import UserList from "./src/screens/UserScreens/UserList";

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
          name="userList"
          component={UserList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="pets"
          component={PetList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="user1"
          component={WalletManagement}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
