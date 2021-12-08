import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/components/Login";
import Home from "./src/components/Home";
import CreateUser from "./src/components/CreateUser";
import { UserProvider } from "./src/contexts/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F2F2F",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateUser" component={CreateUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
