import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import Login from "./src/components/Login";
import Home from "./src/components/Home";
import Event from "./src/components/Event";
import CreateUser from "./src/components/CreateUser";
import CreateGroup from "./src/components/CreateGroup";
import JoinGroup from "./src/components/JoinGroup";
import Lobby from "./src/components/Lobby";
import { UserProvider } from "./src/contexts/UserContext";
import Main from "./src/components/Main";
import Chat from "./src/components/Chat";
import Logout from "./src/components/Logout";
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerRight: () => <Logout />,
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
              },
            }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{
              headerRight: () => <Logout />,
              fontWeight: "bold",
            }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{
              headerRight: () => <Logout />,
              fontWeight: "bold",
            }}
            name="CreateUser"
            component={CreateUser}
          />
          <Stack.Screen
            options={{
              headerRight: () => <Logout />,
              fontWeight: "bold",
            }}
            name="CreateGroup"
            component={CreateGroup}
          />
          <Stack.Screen
            options={{
              headerRight: () => <Logout />,
              fontWeight: "bold",
            }}
            name="Lobby"
            component={Lobby}
          />
          <Stack.Screen
            options={{
              headerRight: () => <Logout />,
              fontWeight: "bold",
            }}
            name="Event"
            component={Event}
          />
          <Stack.Screen
            options={{
              headerRight: () => <Logout />,
              fontWeight: "bold",
            }}
            name="JoinGroup"
            component={JoinGroup}
          />
          <Stack.Screen
            options={{
              headerRight: () => <Logout />,
              fontWeight: "bold",
            }}
            name="Main"
            component={Main}
          />
          <Stack.Screen
            options={{
              headerRight: () => <Logout />,
              fontWeight: "bold",
            }}
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
