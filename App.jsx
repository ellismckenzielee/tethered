import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/components/Login";
import Home from "./src/components/Home";
import Event from "./src/components/Event";
import CreateUser from "./src/components/CreateUser";
import { UserProvider } from "./src/contexts/UserContext";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#2F2F2F",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

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
          <Stack.Screen name="Event" component={Event} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
