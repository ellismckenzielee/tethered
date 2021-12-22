import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createNewUser, getUserData } from "./firestoreDatabaseUtils";

const handleSignUp = (username, email, password, avatar, setError, navigation, setCurrentUser) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      console.log("In handle signup", username, email, password, avatar);
      const user = userCredentials.user;
      console.log("USER CREDENTIALS", userCredentials.user.uid);
      console.log("Registered with:", user.email);
      return createNewUser(userCredentials.user.uid, email, username, avatar);
    })
    .then((userDetails) => {
      console.log(userDetails);
      setCurrentUser(userDetails);
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

const handleLogin = (email, password, setError, navigation, setCurrentUser) => {
  console.log("in handlelogin");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user.uid;
      console.log("USER", user);
      return Promise.all([getUserData(user), user]);
    })
    .then(([user, uid]) => {
      console.log("then block");
      user.uid = uid;
      setCurrentUser(user);
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
