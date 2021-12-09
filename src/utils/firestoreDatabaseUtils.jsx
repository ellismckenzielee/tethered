
import {addDoc, collection, doc, arrayUnion, arrayRemove, updateDoc} from 'firebase/firestore';
import {db} from '../../firebase-config'

// firestore - create new group
async function createNewGroup(currentUser) {
  const newGroup = await addDoc(collection(db, 'groups'), {
    groupAdmin: currentUser,
    groupMembers: [currentUser]
  });
  // console.log the document path in the firestore database within the "groups" collection 
  console.log(`A new group was created at ${newGroup.path}`);
}

// firestore - create new event within group
async function createNewEvent(currentUser, groupDocId) {
  const newEvent = await addDoc(collection(db, `groups/${groupDocId}/events`), {
    eventAdmin: currentUser,
    eventMembers: [currentUser]
  });
  // console.log the document path in the firestore database within the "events" collection 
  console.log(`A new event was created at ${newEvent.path}`);
}

// firestore - join a group - adds user to group Members field
async function joinGroup(currentUser, groupDocId) {
  await updateDoc(doc(db, 'groups', groupDocId), {
    groupMembers: arrayUnion(currentUser),
  });
  // console.log the document path in the firestore database within the "groups" collection 
  console.log(`${currentUser} was added to group ${groupDocId}`);
}


export {createNewGroup, createNewEvent, joinGroup};