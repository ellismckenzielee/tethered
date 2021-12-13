import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  REACT_APP_FIRESTORE_APIKEY,
  REACT_APP_FIRESTORE_AUTHDOMAIN,
  REACT_APP_FIRESTORE_PROJECTID,
  REACT_APP_FIRESTORE_STORAGEBUCKET,
  REACT_APP_FIRESTORE_MESSAGINGSENDERID,
  REACT_APP_FIRESTORE_APPID,
  // eslint-disable-next-line import/no-unresolved
} from "@env";

// firestore config to access database
const firebaseConfig = {
  apiKey: REACT_APP_FIRESTORE_APIKEY,
  authDomain: REACT_APP_FIRESTORE_AUTHDOMAIN,
  projectId: REACT_APP_FIRESTORE_PROJECTID,
  storageBucket: REACT_APP_FIRESTORE_STORAGEBUCKET,
  messagingSenderId: REACT_APP_FIRESTORE_MESSAGINGSENDERID,
  appId: REACT_APP_FIRESTORE_APPID,
};
console.log(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };
