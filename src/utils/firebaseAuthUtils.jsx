import { auth } from "../../firebase-config"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const handleSignUp = (email, password) => {
	createUserWithEmailAndPassword(auth, email, password)
		.then(userCredentials => {
			const user = userCredentials.user;
			console.log('Registered with:', user.email);
		})
		.catch(error => alert(error.message));
};

const handleLogin = (email, password) => {
	signInWithEmailAndPassword(auth,email, password)
		.then(userCredentials => {
			const user = userCredentials.user;
			console.log('Logged in with:', user.email);
		})
		.catch(error => alert(error.message));
};


export { handleSignUp, handleLogin}