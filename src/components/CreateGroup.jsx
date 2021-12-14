import React, { useState, useEffect, useContext } from "react";
import { TouchableHighlight, TouchableOpacity, Image, TextInput, Text, View, StyleSheet } from "react-native";
import styles from "../styles/createGroup.Style";
import { createNewEvent, createNewGroup } from '../utils/firestoreDatabaseUtils';
import { UserContext } from "../contexts/UserContext";

export default function CreateGroup({navigation}) {
	const { currentUser } = useContext(UserContext);
    const [groupName, setGroupName] = useState(" ")
    
  return (
	<View style={styles.container}>
	<Image source={require("../assets/logo.png")} style={styles.logo} />
	<Text style={styles.title}>Create a Group</Text>
	<Text style={styles.text}>Group Name</Text>
	<Text style={styles.Smltext}>e.g. teamTethered</Text>
		<TextInput
			style={styles.textInput}
			placeholder='Team Tethered'
			value={groupName}
			onChangeText={text => {
				setGroupName(text);
			}}
		/>
		<TouchableHighlight
			activeOpacity={0.6}
			underlayColor="#9F4300"
			style={styles.button}
			onPress={() => {
				createNewGroup(currentUser.username, groupName)
				.then((groupPath) => {
					navigation.navigate("Lobby",{groupPath:groupPath});
				})
			}}>
			<Text style={styles.Btntext}>Create Group</Text>
		</TouchableHighlight>
	</View>
  )
};