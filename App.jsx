import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/components/Login";
import { UserProvider } from "./src/contexts/UserContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <UserProvider>
      <View style={styles.container}>
        <Login />
      </View>
    </UserProvider>
  );
}
