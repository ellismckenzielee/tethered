import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: '#454545',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		zIndex: 5,
		width: 400,
		height: 150,
		position: 'absolute',
		top: 200,
		borderRadius: 15,
		shadowColor: '#000000',
		shadowOpacity: 0.7,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 1,
		},
	},
	buttonContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignContent: 'space-between',
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
	},
	Btntext: {
		fontSize: 18,
		color: 'white',
	},
	title: {
		fontSize: 24,
		color: 'white',
		paddingBottom: 5,
	},
});
