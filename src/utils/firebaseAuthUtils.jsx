import { auth } from '../../firebase-config';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';

const handleSignUp = (email, password, setError) => {
	createUserWithEmailAndPassword(auth, email, password)
		.then(userCredentials => {
			const user = userCredentials.user;
			console.log('Registered with:', user.email);
		})
		.catch(error => {
			const popup = {
				title: 'There was a problem',
				msg: 'Incorrect User/Password',
				btn1: 'cancel',
				btn2: 'okay',
				btn1Func: function () {
					setError({});
				},
				btn2Func: function () {
					setError({});
				},
			};
			setError(popup);
		});
};

const handleLogin = (email, password, setError) => {
	signInWithEmailAndPassword(auth, email, password)
		.then(userCredentials => {
			const user = userCredentials.user;
			console.log('Logged in with:', user.email);
		})
		.catch(error => {
			const popup = {
				title: 'There was a problem',
				msg: 'Incorrect User/Password',
				btn1: 'cancel',
				btn2: 'okay',
				btn1Func: function () {
					setError({});
				},
				btn2Func: function () {
					setError({});
				},
			};
			setError(popup);
		});
};

export { handleSignUp, handleLogin };
