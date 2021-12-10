
import {addDoc, collection, doc, arrayUnion, arrayRemove, updateDoc, deleteDoc, getDoc} from 'firebase/firestore';
import {db} from '../../firebase-config'

// firestore - create new group
async function createNewGroup(currentUser, groupName) {
  const newGroup = await addDoc(collection(db, 'groups'), {
    groupAdmin: {
      username: currentUser,
      ready: true
    }, 
    "groupName": groupName,
    groupMembers: [],
    trip: {
      started: false,
      tripId: null
    } 
  });
  // console.log the document path in the firestore database within the "groups" collection 
  console.log(`A new group was created at ${newGroup.path}`);
  return newGroup.path.substring(7);
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



// firestore - delete group
async function deleteGroup(groupDocId) {
  await deleteDoc(doc(db, `groups`, groupDocId));

  console.log(`Group ${groupDocId} has been deleted`);
}



// firestore - update location in event
async function updateLocation(currentUser, groupDocId, eventDocId, latitude, longitude) {
  
  // reads document from the firestore database
  const eventDocSnap = await getDoc(doc(db, `groups/${groupDocId}/events`, eventDocId))
  
  // takes the eventMembers array and creates a new array with the updated location for the currentUser then updates the database
  if (eventDocSnap.exists()){
    const members = eventDocSnap.data().eventMembers;
    const updatedEventMembers = members.map(member => {
      if(member.username === currentUser){
        member.latitude = latitude;
        member.longitude = longitude;
        return member
      }
      else{
        return member
      }
    })
    console.log("updatedEventMembers")

    await updateDoc(doc(db, `groups/${groupDocId}/events`, eventDocId), {
      eventMembers: updatedEventMembers,
    })

  } else {
    // document doesn't exist on database.  doc.data() will be undefined in this case
    console.log("No such document!");
  }
}



export {createNewGroup, createNewEvent, joinGroup, joinEvent, deleteEvent, deleteGroup, updateLocation};