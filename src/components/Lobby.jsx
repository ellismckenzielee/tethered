import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text } from 'react-native';
import styles from '../styles/Lobby.Style';
import { UserContext } from '../contexts/UserContext';
import QRCode from 'react-native-qrcode-svg';
import { connectFirestoreEmulator, doc, onSnapshot } from 'firebase/firestore';
import {db} from '../../firebase-config'
import { approveGroupRequest } from '../utils/firestoreDatabaseUtils';

export default function Lobby({ navigation , route}) {

	const { isLoggedIn, currentUser } = useContext(UserContext);

	//Need to remove route.params or get group id when selecting group from main page
	const {groupPath} = route.params

	const [groupData, setGroupData] = useState({
		"trip": {
		  "started": false,
		  "tripId": null
		},
		"groupName": "place-holder",
		"groupAdmin": {
		  "username": "cyclist1",
		  "ready": false
		},
		"groupMembers": {
		  "cyclist2": {
			"approved": false,
			"ready": false,
			"username": "cyclist2"
		  },
		  "cyclist3": {
			"ready": false,
			"username": "cyclist3",
			"approved": false
		  },
		},
		"groupId": "placeholder"
	  });


	useEffect(() => {
		const unsub = onSnapshot(doc(db, "groups", groupPath), (groupDocument) => {
	 		const source = groupDocument.metadata.hasPendingWrites ? "Local" : "Server";
			setGroupData(()=> {
				return groupDocument.data()
			});
	 	});
		return (() => {
			unsub();
		})
	},[])

	//currently running 3 times without changes

	const members = Object.keys(groupData.groupMembers)
	let newUsers = [];
	members.forEach((member) => {
		newUsers.push(groupData.groupMembers[`${member}`]);
		return newUsers	
	});

	
	
	let isAdmin = false;
	if(currentUser.username === groupData.groupAdmin.username){
		isAdmin = true;
	}
	else{
		isAdmin = false;
	}

	console.log(newUsers)
	console.log(currentUser.username, groupData.groupAdmin.username, "isAdmin", isAdmin)
	
	const event = {
		hasStarted: groupData.trip.started,
		admin: groupData.groupAdmin.username,
		users: newUsers
	};

	console.log(event)

	const { users } = event;
	const approvedUsers = users.filter(user => user.approved);
	const pendingUsers = users.filter(user => !user.approved);
	const [approved, setApproved] = useState(false);

  const logo = require('../assets/logo.png');

	useEffect(() => {
		setTimeout(() => {
			setApproved(true);
		}, 3000);
	});
	if (!approved)
		return (
			<View style={styles.waiting}>
				{/* <Image source={require('../assets/waiting.gif')} style={styles.logo} /> */}
				<Text style={styles.title}>Waiting approval...</Text>
			</View>
		);
	return (
		<View style={styles.container}>
			{approvedUsers.map(user => {
				return (
					<Text style={styles.text} key={user.username}>
						{user.username}
					</Text>
				);
			})}
			{isAdmin &&
				pendingUsers.map(user => {
					return (
						<View key={user.username}>
							<Text style={styles.text} key={user.username}>
								{user.username}
							</Text>
							<TouchableHighlight
								activeOpacity={0.6}
								underlayColor='#9F4300'
								style={styles.button}
								onPress={() => {approveGroupRequest(user.username,groupPath)}}>
								<Text>Approve</Text>
							</TouchableHighlight>
						</View>
					);
				})}
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					navigation.navigate('Event');
				}}>
				<Text>Start Trip</Text>
			</TouchableOpacity>

{/* Need to change groupPath from create a group to the groupId */}
      <QRCode
        value={groupPath}
        size={ 200}
				logo={logo}
				logoSize={55}
				logoBackgroundColor='black'
			/>
		</View>
	);
}
