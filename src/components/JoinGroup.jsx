import React, { useState, useEffect } from 'react';
import {
	Dimensions,
	Image,
	Text,
	View,
	Button,
	StyleSheet,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../styles/JoinGroup.Style';
const { width } = Dimensions.get('window');
const qrSize = width * 0.5;
export default function JoinGroup() {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, [scanned]);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		alert(`Barcode with type ${type} and data ${data} has been scanned!`);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
 	console.log(scanned)
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Join group</Text>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={(StyleSheet.absoluteFillObject, styles.scanner)}
			/>
			{scanned && (
				<Button
					color='#F96800'
					style={styles.button}
					title={'Tap to Scan Again'}
					onPress={() => setScanned(false)}
				/>
			)}
			<Image style={style.qr} source={require('../assets/qr.png')} />
			<Text style={styles.info}>
				Scan the group leaders QR code to join their group
			</Text>
		</View>
	);
}
const style = StyleSheet.create({
	qr: {
		position: 'absolute',
		flex: 3,
		width: qrSize,
		height: qrSize,
		zIndex: 5,
	},
});
