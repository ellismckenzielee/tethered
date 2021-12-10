import React, {useContext, useState, useEffect} from 'react';
import { TouchableOpacity, Image, TextInput, Text, View, StyleSheet} from 'react-native';
import styles from '../styles/Login.Style';
import QRCode from 'react-native-qrcode-svg';
import { createNewEvent, createNewGroup } from '../utils/firestoreDatabaseUtils';
import { UserContext } from "../contexts/UserContext";


export default function CreateGroup() {
	const { currentUser } = useContext(UserContext);
    const [groupName, setGroupName] = useState(" ")
    const [qrLink, setQrLink] = useState(
			'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
		);
 
    
	const logo = require('../assets/logo.png');
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
					// create new group on firebase with username
					// return group id
					// input groupName for group name
					createNewGroup(currentUser.username, groupName)
					.then((path) => {
						console.log(path);
						setQrLink(path);
						createNewEvent(currentUser.username,path,0,0)
					})
				}}>
				<Text>Create Group</Text>
			</TouchableOpacity>
			<QRCode
                value={qrLink}
                size={ 200}
				logo={logo}
				logoSize={55}
				logoBackgroundColor='black'
			/>
		</View>
	);
}
