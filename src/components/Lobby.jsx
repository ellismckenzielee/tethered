import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, TouchableHighlight, Text, Image, ScrollView } from "react-native";
import styles from "../styles/Lobby.Style";
import { UserContext } from "../contexts/UserContext";
import QRCode from "react-native-qrcode-svg";
import { connectFirestoreEmulator, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import { approveGroupRequest, createNewTrip } from "../utils/firestoreDatabaseUtils";

export default function Lobby({ navigation, route }) {
  const { isLoggedIn, currentUser } = useContext(UserContext);

  //Need to remove route.params or get group id when selecting group from main page
  const { groupPath } = route.params;

  const [groupData, setGroupData] = useState({
    trip: {
      started: false,
      tripId: null,
    },
    groupName: "place-holder",
    groupAdmin: {
      username: "cyclist1",
      ready: false,
    },
    groupMembers: {
      cyclist2: {
        approved: false,
        ready: false,
        username: "cyclist2",
      },
      cyclist3: {
        ready: false,
        username: "cyclist3",
        approved: false,
      },
    },
    groupId: "placeholder",
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "groups", groupPath), (groupDocument) => {
      const source = groupDocument.metadata.hasPendingWrites ? "Local" : "Server";
      setGroupData(() => {
        if (groupDocument.data().groupMembers[currentUserName]?.approved === true) {
          setApproved(true);
          console.log("Approved:", groupDocument.data().groupMembers[currentUserName]);
        }
        return groupDocument.data();
      });
    });
    return () => {
      unsub();
    };
  }, []);

  //currently running 3 times without changes

  const members = Object.keys(groupData.groupMembers);
  let newUsers = [];
  members.forEach((member) => {
    newUsers.push(groupData.groupMembers[`${member}`]);
    return newUsers;
  });

  let isAdmin = false;
  console.log(groupData);
  if (currentUser.username === groupData.groupAdmin.username) {
    isAdmin = true;
  } else {
    isAdmin = false;
  }
  console.log(isAdmin);
  const event = {
    hasStarted: groupData.trip.started,
    admin: groupData.groupAdmin.username,
    users: newUsers,
  };
  const { users } = event;
  const approvedUsers = users.filter((user) => user.approved);
  const pendingUsers = users.filter((user) => !user.approved);
  const [approved, setApproved] = useState(false);
  const [userApprovedList, setUserApprovedList] = useState(approvedUsers);
  const [pendingUsersList, setPendingUsersList] = useState(pendingUsers);

  const logo = require("../assets/logo.png");

  const currentUserName = currentUser.username;

  if (currentUser.username === groupData.groupAdmin.username && groupData.trip.started === true) {
    navigation.navigate("Event", { tripId: groupData.trip.tripId });
  } else if (groupData.trip.started === true && groupData.groupMembers[currentUserName]?.approved === true) {
    navigation.navigate("Event", { tripId: groupData.trip.tripId });
  }

  useEffect(() => {
    console.log(`approvedUsers`, userApprovedList);
    console.log(`pendingUsers`, pendingUsersList);
    console.log("groupmembers", groupData.groupMembers);
    setTimeout(() => {}, 100);
  }, [userApprovedList, pendingUsersList]);

  if (!approved && !isAdmin)
    return (
      <View style={styles.waiting}>
        <Image source={require("../assets/waiting.gif")} style={styles.logo} />
        <View style={styles.waitingMessage}>
          <Text style={styles.title}>Request submitted to join group</Text>
          <Text style={styles.waitingText}>Group membership awaiting approval by the group leader</Text>
          <Text style={styles.waitingText}>Come back when approved</Text>
        </View>
      </View>
    );
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <Text style={styles.pendingtext}>Group Leader</Text>
        <View style={styles.approved}>
          <View key={groupData.groupAdmin.username} style={styles.userCard}>
            <Image style={[styles.avatar]} source={groupData.groupAdmin.avatarUrl ? { uri: groupData.groupAdmin.avatarUrl } : require("../assets/avatar.png")} />
            <Text style={styles.username} key={groupData.groupAdmin.username}>
              {groupData.groupAdmin.username}
            </Text>
          </View>
        </View>

        <Text style={styles.pendingtext}>Approved Group Members</Text>

        <View style={styles.approved}>
          {approvedUsers.map((user) => {
            console.log(user);
            return (
              <View key={user.username} style={styles.userCard}>
                <Image style={[styles.avatar, user.accepted ? styles.ready : styles.avatar]} source={user.avatarUrl ? { uri: user.avatarUrl } : require("../assets/avatar.png")} />
                <Text style={styles.username} key={user.username}>
                  {user.username}
                </Text>
                {isAdmin && (
                  <TouchableHighlight activeOpacity={0.6} underlayColor="#9F4300" style={styles.button} onPress={() => {}}>
                    <Text style={styles.Btntext}>remove</Text>
                  </TouchableHighlight>
                )}
              </View>
            );
          })}
        </View>

        {isAdmin && <Text style={styles.pendingtext}>Pending requests</Text>}
        <View style={styles.pending}>
          {isAdmin &&
            pendingUsers.map((user) => {
              return (
                <View key={user.username} style={styles.userCard}>
                  <Image style={styles.avatar} source={user.avatarUrl ? { uri: user.avatarUrl } : require("../assets/avatar.png")} />
                  <Text style={styles.username} key={user.username}>
                    {user.username}
                  </Text>
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#9F4300"
                    style={styles.button}
                    onPress={() => {
                      approveGroupRequest(user.username, groupPath);
                    }}
                  >
                    <Text style={styles.Btntext}>Approve</Text>
                  </TouchableHighlight>
                </View>
              );
            })}
        </View>
        <TouchableHighlight
          style={styles.tripButton}
          activeOpacity={0.6}
          underlayColor="#9F4300"
          onPress={() => {
            createNewTrip(currentUser.username, groupPath, groupData.groupName).then((tripId) => {
              navigation.navigate("Event", { tripId: tripId });
            });
          }}
        >
          <Text style={styles.Btntext}>Start Trip</Text>
        </TouchableHighlight>

        {/* Need to change groupPath from create a group to the groupId */}
        <View style={{ paddingLeft: 85 }}>
          <QRCode value={groupPath} size={200} />
        </View>

        <Text style={styles.groupidtext}>Group ID: {groupPath}</Text>
      </ScrollView>
    </View>
  );
}
