import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Image, TextInput, Text, View, StyleSheet} from 'react-native';
import styles from '../styles/Login.Style';
import QRCode from 'react-native-qrcode-svg';


export default function CreateGroup() {
    const [groupLink, setGroupLink] = useState(" ")
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
				value={groupLink}
				onChangeText={text => {
					setGroupLink(text);
				}}
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					setQrLink(groupLink);
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
