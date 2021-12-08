import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/components/Login";
import Home from "./src/components/Home";
import CreateUser from "./src/components/CreateUser";
import CreateGroup from "./src/components/CreateGroup";
import { UserProvider } from "./src/contexts/UserContext";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateUser" component={CreateUser} />
          <Stack.Screen name="CreateGroup" component={CreateGroup} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
