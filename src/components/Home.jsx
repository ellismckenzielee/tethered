import React, { useContext, useState } from "react";
import {
  Button,
  Image,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/Login.Style";
import { UserContext } from "../contexts/UserContext";

export default function Home({ navigation }) {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text>Already have an account? Get Started!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text>Log In</Text>
      </TouchableOpacity>
      <Text>Need an account? Sign up now!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("CreateUser");
        }}
      >
        <Text>Signup!</Text>
      </TouchableOpacity>
      <Text>DEV: go to create group page</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("CreateGroup");
        }}
      >
        <Text>go to create group page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Lobby");
        }}
      >
        <Text>Event Page</Text>
      </TouchableOpacity>
    </View>
  );
}
