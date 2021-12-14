import React, { useContext, useEffect, useState } from 'react';
import {
	View,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	Image,
} from 'react-native';
import styles from '../styles/Lobby.Style';
import { UserContext } from '../contexts/UserContext';

export default function Lobby({ navigation }) {
	const { isLoggedIn, currentUser } = useContext(UserContext);
	const isAdmin = false;
	const event = {
		hasStarted: false,
		admin: 'uiudsiudsig',
		users: [
			{
				name: 'Ross',
				accepted: false,
				isAdmin: false,
				avatar: '',
			},
			{
				name: 'Rachel',
				accepted: false,
				isAdmin: false,
				avatar: 'https://i.imgur.com/owMZL3A.jpeg',
			},
			{
				name: 'Monica',
				accepted: false,
				isAdmin: true,
				avatar: 'https://i.imgur.com/nwPhm14.jpeg',
			},
			{
				name: 'Joey',
				accepted: false,
				isAdmin: false,
				avatar: '',
			},
			{
				name: 'Chandler',
				accepted: false,
				isAdmin: false,
				avatar: 'https://i.imgur.com/owMZL3A.jpeg',
			},
			{
				name: 'Phoebe',
				accepted: false,
				isAdmin: true,
				avatar: 'https://i.imgur.com/nwPhm14.jpeg',
			},
		],
	};
	const { users } = event;
	const approvedUsers = users.filter(user => user.accepted);
	const pendingUsers = users.filter(user => !user.accepted);
	const [approved, setApproved] = useState(false);
	const [userApprovedList, setUserApprovedList] = useState(approvedUsers);
	const [pendingUsersList, setPendingUsersList] = useState(pendingUsers);

	useEffect(() => {
		console.log(`approvedUsers`, userApprovedList);
		console.log(`pendingUsers`, pendingUsersList);
		setTimeout(() => {
			setApproved(true);
		}, 100);
	}, [userApprovedList, pendingUsersList]);

	if (!approved)
		return (
			<View style={styles.waiting}>
				{/* <Image source={require('../assets/waiting.gif')} style={styles.logo} /> */}
				<Text style={styles.title}>Waiting approval...</Text>
			</View>
		);
	return (
		<View style={styles.container}>
			<Text style={styles.pendingtext}>Approved</Text>
			<View style={styles.approved}>
				{userApprovedList.map(user => {
					return (
						<View key={user.name}>
							<Text style={styles.text} key={user.name}>
								{user.name}
							</Text>
							<Image
								style={styles.avatar}
								source={
									user.avatar ? user.avatar : require('../assets/avatar.png')
								}
							/>
							<TouchableHighlight
								activeOpacity={0.6}
								underlayColor='#9F4300'
								style={styles.button}
								onPress={() => {}}>
								<Text>remove</Text>
							</TouchableHighlight>
						</View>
					);
				})}
			</View>
			<Text style={styles.pendingtext}>Pending</Text>
			<View style={styles.pending}>
				{isAdmin &&
					pendingUsersList.map(user => {
						return (
							<View key={user.name}>
								<Text style={styles.text} key={user.name}>
									{user.name}
								</Text>
								<Image
									style={styles.avatar}
									source={
										user.avatar ? user.avatar : require('../assets/avatar.png')
									}
								/>
								<TouchableHighlight
									activeOpacity={0.6}
									underlayColor='#9F4300'
									style={styles.button}
									onPress={() => {
										user.accepted = true;
										setUserApprovedList(prevApproved => {
											return [...prevApproved, user];
										});
										setApproved(false);
										setPendingUsersList(prevPending => {
											const newPendingUsers = prevPending.filter(
												prevuser => prevuser.name !== user.name,
											);
											console.log('new', newPendingUsers);
											return newPendingUsers;
										});
									}}>
									<Text>Approve</Text>
								</TouchableHighlight>
							</View>
						);
					})}
			</View>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					navigation.navigate('Event');
				}}>
				<Text>Start Trip</Text>
			</TouchableOpacity>
		</View>
	);
}
