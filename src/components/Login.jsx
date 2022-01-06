import React, { useContext, useState, useEffect } from "react";
import { TouchableHighlight, Image, TextInput, Text, View, KeyboardAvoidingView } from "react-native";
import styles from "../styles/Login.Style";
import { UserContext } from "../contexts/UserContext";
import { handleLogin } from "../utils/firebaseAuthUtils";
import DialogComponent from "../components/DialogueComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  useEffect(() => {
    return () => {};
  }, [error]);
  return (
    <View style={styles.container}>
      {Object.keys(error).length > 0 ? <DialogComponent popup={error} /> : <Image></Image>}
      <KeyboardAwareScrollView>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.textInput} placeholder="tom@teamtethered.com" onChangeText={setEmail} />
        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.textInput} onChangeText={setPassword} placeholder="password" />
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#9F4300"
          style={styles.button}
          onPress={() => {
            handleLogin(email, password, setError, navigation, setCurrentUser);
          }}
        >
          <Text style={styles.Btntext}>Log In</Text>
        </TouchableHighlight>
      </KeyboardAwareScrollView>
    </View>
  );
}
