
import {addDoc, collection, doc} from 'firebase/firestore';
import {db} from '../../firebase-config'

// firestore - create new group
async function createANewGroup(currentUser) {
  const newGroup = await addDoc(collection(db, 'groups'), {
    groupAdmin: currentUser,
  });
  // console.log the document path in the firestore database within the "groups" collection 
  console.log(`A new group was created at ${newGroup.path}`);
}

// firestore - create new event within group
async function createANewEvent(currentUser, groupDocId) {
  const newEvent = await addDoc(collection(db, `groups/${groupDocId}/events`), {
    eventAdmin: currentUser,
  });
  // console.log the document path in the firestore database within the "events" collection 
  console.log(`A new event was created at ${newEvent.path}`);
}

export {createANewGroup, createANewEvent};