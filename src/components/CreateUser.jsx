import React, { useContext, useState, useEffect } from "react";
import { TouchableHighlight, Image, TextInput, Text, View, SafeAreaView, ScrollView } from "react-native";
import styles from "../styles/Signup.Style";
import { UserContext } from "../contexts/UserContext";
import { handleSignUp } from "../utils/firebaseAuthUtils";
import DialogComponent from "../components/DialogueComponent";

export default function CreateUser({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState({});
  useEffect(() => {
    return () => {};
  }, [error]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Enter Details</Text>
        <Text style={styles.text}>Username</Text>
        <TextInput style={styles.textInput} placeholder="Example123" onChangeText={setUsername} required />
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.textInput} placeholder="tom@teamtethered.com" onChangeText={setEmail} />
        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.textInput} onChangeText={setPassword} placeholder="password" onChangeText={setPassword} />
        <Text style={styles.text}>Avatar</Text>
        <TextInput style={styles.textInput} placeholder="avatar url" onChangeText={setAvatar} />
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#9F4300"
          style={styles.button}
          onPress={() => {
            handleSignUp(username, email, password, avatar, setError, navigation, setCurrentUser);
          }}
        >
          <Text style={styles.Btntext}>Sign Up!</Text>
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
}
