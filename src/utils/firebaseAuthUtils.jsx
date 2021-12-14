import { auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const handleSignUp = (
  username,
  email,
  password,
  avatar,
  setError,
  navigation
) => {
  createUserWithEmailAndPassword(auth, email, password, username, avatar)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("Registered with:", user.email);
      navigation.navigate("Main");
    })
    .catch((error) => {
      const popup = {
        title: "There was a problem",
        msg: "Incorrect User/Password",
        btn1: "cancel",
        btn2: "okay",
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

const handleLogin = (email, password, setError, navigation) => {
  console.log("in handlelogin");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("Logged in with:", user.email);
      navigation.navigate("Main");
    })
    .catch((error) => {
      const popup = {
        title: "There was a problem",
        msg: "Incorrect User/Password",
        btn1: "cancel",
        btn2: "okay",
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
