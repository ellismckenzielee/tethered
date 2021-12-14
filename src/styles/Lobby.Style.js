import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: '#2F2F2F',
		alignItems: 'center',
		textAlign: 'center',
		width: '100%',
		height: '100%',
	},
	button: {
		backgroundColor: '#F96800',
		paddingLeft: 25,
		paddingRight: 25,
		paddingTop: 2,
		paddingBottom: 5,
		borderRadius: 15,
		margin: 10,
		marginBottom: 30,
		shadowColor: '#000000',
		shadowOpacity: 0.7,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 1,
		},
	},
	text: {
		fontSize: 18,
		color: 'white',
		marginBottom: 15,
		position: 'absolute',
		top: 10,
		zIndex: 5,
	},
	Btntext: {
		fontSize: 18,
		color: 'white',
	},
	waiting: {
		backgroundColor: '#2F2F2F',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		width: '100%',
		height: '100%',
	},
	title: {
		fontSize: 45,
		color: 'white',
		marginBottom: 30,
		fontWeight: '600',
	},
	avatar: {
		height: 100,
		width: 100,
	},
	pending: {
		marginTop: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	approved: {
		marginTop: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	pendingtext: {
		fontSize: 32,
		marginBottom: 30,
		color: 'white',
	},
	username: {
		color: 'white',
		fontSize: 16,
	},
	userCard: {
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
	},
});
