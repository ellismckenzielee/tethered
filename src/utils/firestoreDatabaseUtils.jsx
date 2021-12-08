
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../../firebase-config'

// firestore - create new group
const groupsCollection = collection(db, 'groups');

async function createANewGroup(currentUser) {
  const newGroup = await addDoc(groupsCollection, {
    groupAdmin: currentUser,
  });
  // console.log the document path in the firestore database within the "groups" collection 
  console.log(`A new group was created at ${newGroup.path}`);
}
export {createANewGroup};