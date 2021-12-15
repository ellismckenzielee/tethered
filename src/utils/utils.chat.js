import { collection, addDoc, onSnapshot, query, orderBy, getDoc, doc, Timestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
export const watchGroupChat = async (groupId, cb) => {
  const docRef = doc(db, `groupChats`, `${groupId}`);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    try {
      await setDoc(doc(db, "groupChats", groupId), { groupId: groupId });
    } catch (err) {
      console.log(err);
    }
  }
  const q = query(collection(db, `groupChats/${groupId}/messages`), orderBy("created_at"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    cb(querySnapshot);
  });
  return unsubscribe;
};

export const sendMessage = async (groupId, message, author, setMessage) => {
  const newMessage = {
    author: author,
    message: message,
    created_at: Timestamp.now(),
  };
  const returnedMessage = await addDoc(collection(db, "groupChats", `${groupId}`, "messages"), newMessage);
  if (setMessage) {
    setMessage("");
  }
};
