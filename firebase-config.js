import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {
  REACT_APP_FIRESTORE_APIKEY,
  REACT_APP_FIRESTORE_AUTHDOMAIN,
  REACT_APP_FIRESTORE_PROJECTID,
  REACT_APP_FIRESTORE_STORAGEBUCKET,
  REACT_APP_FIRESTORE_MESSAGINGSENDERID,
  REACT_APP_FIRESTORE_APPID
} from '@env'

const firebaseConfig = {
  apiKey: REACT_APP_FIRESTORE_APIKEY,
  authDomain: REACT_APP_FIRESTORE_AUTHDOMAIN,
  projectId: REACT_APP_FIRESTORE_PROJECTID,
  storageBucket: REACT_APP_FIRESTORE_STORAGEBUCKET,
  messagingSenderId: REACT_APP_FIRESTORE_MESSAGINGSENDERID,
  appId: REACT_APP_FIRESTORE_APPID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};