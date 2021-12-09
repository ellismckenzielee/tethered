
import {addDoc, collection, doc, arrayUnion, arrayRemove, updateDoc, deleteDoc} from 'firebase/firestore';
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
async function createNewEvent(currentUser, groupDocId, latitude, longitude) {
  const newEvent = await addDoc(collection(db, `groups/${groupDocId}/events`), {
    eventAdmin: currentUser,
    eventMembers: [{"username": currentUser, latitude, longitude}]
  });
  // console.log the document path in the firestore database within the "events" collection 
  console.log(`A new event was created at ${newEvent.path}`);
}

// firestore - join a group - adds user to group Members field
async function joinGroup(currentUser, groupDocId) {
  await updateDoc(doc(db, 'groups', groupDocId), {
    groupMembers: arrayUnion(currentUser),
  });

  console.log(`${currentUser} was added to group ${groupDocId}`);
}

// firestore - join an event - adds user to group Members field with latitude and longitude.
async function joinEvent(currentUser, groupDocId, eventDocId, latitude, longitude) {
  await updateDoc(doc(db, `groups/${groupDocId}/events`, eventDocId), {
    eventMembers: arrayUnion({"username": currentUser, latitude, longitude}),
  });
  
  console.log(`${currentUser} was added to event ${eventDocId}`);
}

// firestore - delete event within group
async function deleteEvent(groupDocId, eventDocId) {
  await deleteDoc(doc(db, `groups/${groupDocId}/events`, eventDocId));

  console.log(`Event ${eventDocId} has been deleted`);
}

export {createNewGroup, createNewEvent, joinGroup, joinEvent, deleteEvent};