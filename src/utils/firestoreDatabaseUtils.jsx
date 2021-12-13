
import {addDoc, collection, doc, arrayUnion, arrayRemove, updateDoc, deleteDoc, getDoc} from 'firebase/firestore';
import {db} from '../../firebase-config'

// firestore - create new group
async function createNewGroup(currentUser, groupName) {
  const newGroup = await addDoc(collection(db, 'groups'), {
    groupAdmin: {
      username: currentUser,
      ready: false
    }, 
    "groupName": groupName,
    groupMembers: [],
    trip: {
      started: false,
      tripId: null
    } 
  });
  
  const groupId = newGroup.path.substring(7)
  // add document number to the group as groupId
  const groupDocSnap = await getDoc(doc(db, 'groups', groupId))
  await updateDoc(doc(db, 'groups', groupId), {
    groupId : groupId,
  });

  // console.log the document path in the firestore database within the "groups" collection 
  console.log(`A new group was created at ${newGroup.path}`);

  return groupId;
}



// firestore - request to join a group - adds user to group Members field with status "Approved: false"
async function joinGroupRequest(currentUser, groupDocId) {
  
  // reads document from the firestore database
  const groupDocSnap = await getDoc(doc(db, 'groups', groupDocId))
  
  // takes the groupMembers object and updates object with new member if they aren't already in the group 
  if (!groupDocSnap.data().groupMembers[currentUser]){

    const groupMembers = groupDocSnap.data().groupMembers;
    
    groupMembers[currentUser] = {
        approved: false,
        ready: false,
        username: currentUser
    };

    await updateDoc(doc(db, 'groups', groupDocId), {
          groupMembers : groupMembers,
    })

    console.log(`${currentUser} was added to group ${groupDocId}`)
  }
  else {
    console.log(`${currentUser} is already a group member`) 
  }
}


// firestore - approve group request - updates groupMembers field with status "Approved: true"
async function approveGroupRequest(groupMember, groupDocId) {
  
  // reads document from the firestore database
  const groupDocSnap = await getDoc(doc(db, 'groups', groupDocId))
  
  // takes the groupMembers object and updates approved status 
  if (groupDocSnap.data().groupMembers[groupMember]){

    const groupMembers = groupDocSnap.data().groupMembers;
    
    groupMembers[`${groupMember}`]["approved"] = true,

    await updateDoc(doc(db, 'groups', groupDocId), {
      groupMembers
    })

    console.log(`${groupMember} has been approved to join the group ${groupDocId}`)
  }
  else {
    console.log(`${groupMember} can't be found in group members`) 
  }
}

// firestore - readyUp- updates groupMembers field with status "ready: true"
async function readyUp(groupMember, groupDocId) {
  
  // reads document from the firestore database
  const groupDocSnap = await getDoc(doc(db, 'groups', groupDocId))
  
  // takes the groupMembers object and updates ready status
  if (groupDocSnap.data().groupMembers[groupMember]){

    const groupMembers = groupDocSnap.data().groupMembers;
    
    groupMembers[`${groupMember}`]["ready"] = true,

    await updateDoc(doc(db, 'groups', groupDocId), {
      groupMembers
    })

    console.log(`${groupMember} is ready`)
  }
  else {
    console.log(`${groupMember} can't be found in group members`) 
  }
}



// firestore - readyUpAdmin- updates groupAdmin field with status "ready: true"
async function readyUpAdmin(groupDocId) {
  
  // reads document from the firestore database
  const groupDocSnap = await getDoc(doc(db, 'groups', groupDocId))
  
  // takes the groupMembers object and updates ready status
  if (groupDocSnap.exists()){

    await updateDoc(doc(db, 'groups', groupDocId), {
      "groupAdmin.ready" : true
    })

    console.log(`Group admin is ready`)
  }
  else {
    console.log(`Group can't be found`) 
  }
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



export {
  createNewGroup,
  joinGroupRequest,
  approveGroupRequest,
  readyUp,
  readyUpAdmin,
  createNewEvent,
  joinEvent,
  deleteEvent,
  deleteGroup,
  updateLocation};