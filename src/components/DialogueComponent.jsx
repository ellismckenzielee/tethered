import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styles from '../styles/Dialogue.Style';

export default function DialogueComponent({ popup }) {
	const { title, msg, btn1, btn2, btn1Func, btn2Func } = popup;
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.text}>{msg}</Text>
			<View style={styles.buttonContainer}>
				<TouchableHighlight
					activeOpacity={0.6}
					underlayColor='#9F4300'
					style={styles.button}
					onPress={btn1Func}>
					<Text style={styles.Btntext}>{btn1}</Text>
				</TouchableHighlight>
				<TouchableHighlight
					activeOpacity={0.6}
					underlayColor='#9F4300'
					style={styles.button}
					onPress={btn2Func}>
					<Text style={styles.Btntext}>{btn2}</Text>
				</TouchableHighlight>
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
