import React, {useContext, useState, useEffect} from 'react';
import { TouchableOpacity, Image, TextInput, Text, View, StyleSheet} from 'react-native';
import styles from '../styles/Login.Style';
import { createNewEvent, createNewGroup } from '../utils/firestoreDatabaseUtils';
import { UserContext } from "../contexts/UserContext";


export default function CreateGroup({navigation}) {
	const { currentUser } = useContext(UserContext);
    const [groupName, setGroupName] = useState(" ")
    
	return (
		<View style={styles.container}>
			<Text>Enter Details</Text>
			<Text>Group Name</Text>
			<TextInput
				placeholder='Team Tethered'
				value={groupName}
				onChangeText={text => {
					setGroupName(text);
				}}
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					createNewGroup(currentUser.username, groupName)
					.then((groupPath) => {
						navigation.navigate("Lobby",{groupPath:groupPath});
					})
				}}>
				<Text>Create Group</Text>
			</TouchableOpacity>
		</View>
	);
}
