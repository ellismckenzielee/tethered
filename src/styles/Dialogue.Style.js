import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: '#686868',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		zIndex: 5,
		width: 200,
		height: 150,
		position: 'absolute',
		top: 200,
	},
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent:"space-between"
  },
  button: {
    marginVertical: 15,
    marginHorizontal: 15,
		backgroundColor: '#F96800',
    padding: 10,
    
	},
	logo: {
		width: 227,
		height: 332,
	},
});
