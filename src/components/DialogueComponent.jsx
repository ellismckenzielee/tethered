import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/Dialogue.Style';

export default function DialogueComponent({ popup }) {
	const { title, msg, btn1, btn2, btn1Func, btn2Func } = popup;
	return (
		<View style={styles.container}>
			<Text>{title}</Text>
			<Text>{msg}</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={btn1Func}>
					<Text>{btn1}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={btn2Func}>
					<Text>{btn2}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
// HOW TO USE:
// add this as a component in any other component
// const popup = {
// 	title: 'There was a problem',
// 	msg: 'Incorrect User/Password',
// 	btn1: 'cancel',
// 	btn2: 'okay',
// 	btn1Func: function () {
// 		setError({});
// 	},
// 	btn2Func: function () {},
// };
//then a nice bit of conditional rendering
// {Object.keys(error).length > 0 ? <DialogComponent popup={error} /> : <Image></Image>};
