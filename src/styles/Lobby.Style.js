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
	text:{
		fontSize: 18,
		color: 'white',
		marginBottom: 15,
		position: "absolute",
		top: 10,
		zIndex:5
	},
	Btntext:{
		fontSize: 18,
		color: 'white',
	},
	logo: {
		width: 20,
		height: 20,
		marginBottom: 30,
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
});
