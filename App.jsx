import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/components/Login";
import Home from "./src/components/Home";
import Event from "./src/components/Event";
import CreateUser from "./src/components/CreateUser";
import CreateGroup from "./src/components/CreateGroup";
import JoinGroup from "./src/components/JoinGroup";
import Lobby from "./src/components/Lobby";
import { UserProvider } from "./src/contexts/UserContext";
import Main from "./src/components/Main";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(/\w+AsyncStorage\w+/);

const Stack = createNativeStackNavigator();

// eslint-disable-next-line react/function-component-definition
export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateUser" component={CreateUser} />
          <Stack.Screen name="CreateGroup" component={CreateGroup} />
          <Stack.Screen name="Lobby" component={Lobby} />
          <Stack.Screen name="Event" component={Event} />
          <Stack.Screen name="JoinGroup" component={JoinGroup} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
