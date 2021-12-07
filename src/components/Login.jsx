import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { Button, Image, TextInput, Text, View } from "react-native";
import styles from "../styles/Login.Style";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image></Image>
      <Text>Login</Text>
      <Text>Email</Text>
      <TextInput placeholder="example@google.com" onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput placeholder="password" onChangeText={setPassword} />
      <Button
        title="Log In"
        onPress={() => {
          setCurrentUser({ username: email, password: password });
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
