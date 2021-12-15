import React, { useContext, useState } from "react";
import { Button, Image, TextInput, Text, View, TouchableOpacity, TouchableHighlight } from "react-native";
import styles from "../styles/Home.Style";
import { UserContext } from "../contexts/UserContext";

export default function Home({ navigation }) {
  const { isLoggedIn } = useContext(UserContext);
  if (isLoggedIn) {
    navigation.navigate("Main");
  }
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.text}>Already have an account? Get Started!</Text>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#9F4300"
        style={styles.button}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.Btntext}>Log In</Text>
      </TouchableHighlight>
      <Text style={styles.text}>Need an account? Sign up now!</Text>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#9F4300"
        style={styles.button}
        onPress={() => {
          navigation.navigate("CreateUser");
        }}
      >
        <Text style={styles.Btntext}>Signup!</Text>
      </TouchableHighlight>
     
    </View>
  );
}
