import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity, Image, TextInput, Text, View } from "react-native";
import styles from "../styles/Login.Style";
import { UserContext } from "../contexts/UserContext";
import { handleSignUp } from '../utils/firebaseAuthUtils'
import DialogComponent from '../components/DialogueComponent';

export default function CreateUser() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
   useEffect(() => {
			
			return () => {};
		}, [error]);
  return (
		<View style={styles.container}>
			{Object.keys(error).length > 0 ? (
				<DialogComponent popup={error} />
			) : (
				<Image></Image>
			)}
			<Image></Image>
			<Text>Enter Details</Text>
			<Text>Email</Text>
			<TextInput placeholder='example@google.com' onChangeText={setEmail} />
			<Text>Password</Text>
			<TextInput placeholder='password' onChangeText={setPassword} />
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					setCurrentUser({ username: email, password: password });
					handleSignUp(email, password, setError);
				}}>
				<Text>Sign Up!</Text>
			</TouchableOpacity>
		</View>
	);
}
