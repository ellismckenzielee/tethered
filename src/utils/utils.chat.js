import { collection, query, onSnapshot, where, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
export const watchGroupChat = async (groupId, cb) => {
  const docRef = doc(db, `groupChats`, `${groupId}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const q = collection(db, `groupChats/${groupId}/messages`);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      cb(querySnapshot);
    });
    return unsubscribe;
  } else {
    console.log("ERROR");
  }
};
