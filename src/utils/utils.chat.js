import { collection, addDoc, onSnapshot, query, orderBy, getDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
export const watchGroupChat = async (groupId, cb) => {
  const docRef = doc(db, `groupChats`, `${groupId}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const q = query(collection(db, `groupChats/${groupId}/messages`), orderBy("created_at"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      cb(querySnapshot);
    });
    return unsubscribe;
  } else {
    console.log("ERROR");
  }
};

export const sendMessage = async (groupId, message, author, setMessage) => {
  const newMessage = {
    author: author,
    message: message,
    created_at: Timestamp.now(),
  };
  const returnedMessage = await addDoc(collection(db, "groupChats", `${groupId}`, "messages"), newMessage);
  setMessage("");
};
