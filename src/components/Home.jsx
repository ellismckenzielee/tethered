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

  console.log(styles);
  return (
    <View style={styles.container}>
      <Image></Image>
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
          navigation.navigate("CreateAccount");
        }}
      >
        <Text>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}
