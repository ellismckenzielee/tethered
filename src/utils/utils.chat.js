import { collection, addDoc, onSnapshot, query, orderBy, getDoc, doc, Timestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
export const watchGroupChat = async (groupId, cb) => {
  const docRef = doc(db, `groupChats`, `${groupId}`);
  const docSnap = await getDoc(docRef);
  console.log(groupId);
  if (!docSnap.exists()) {
    console.log("creating doc");
    try {
      await setDoc(doc(db, "groupChats", groupId), { groupId: groupId });
    } catch (err) {
      console.log(err);
    }
    console.log("created");
  }
  const q = query(collection(db, `groupChats/${groupId}/messages`), orderBy("created_at"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    cb(querySnapshot);
  });
  console.log(true);
  return unsubscribe;
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
