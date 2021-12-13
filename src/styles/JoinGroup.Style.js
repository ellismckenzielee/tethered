import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: '#2F2F2F',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		width: '100%',
		height: '100%',
	},
	scanner: {
		flex: 3,
		height: 10,
		width: 900,
	},
	title: {
		flex: 1,
		marginTop: 25,
		fontWeight: 'bold',
		fontSize: 60,
		color: 'white',
	},
	info: {
		flex: 1,
		color: 'white',
		marginTop: 50,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: 'black',
	},
});
