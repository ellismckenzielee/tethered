import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../styles/Login.Style";
import { UserContext } from "../contexts/UserContext";

export default function Lobby({ navigation }) {
  const { isLoggedIn, currentUser } = useContext(UserContext);
  const isAdmin = true;
  const event = {
    hasStarted: false,
    admin: "uiudsiudsig",
    users: [
      { name: "Ellis", accepted: true, isAdmin: false },
      { name: "Stuart", accepted: false, isAdmin: false },
      { name: "Tom", accepted: false, isAdmin: true },
    ],
  };
  const { users } = event;
  const approvedUsers = users.filter((user) => user.accepted);
  const pendingUsers = users.filter((user) => !user.accepted);
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setApproved(true);
    }, 3000);
  });
  if (!approved)
    return (
      <View>
        <Text>Waiting approval...</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      {approvedUsers.map((user) => {
        return <Text key={user.name}>{user.name}</Text>;
      })}
      {isAdmin &&
        pendingUsers.map((user) => {
          return (
            <View key={user.name}>
              <Text key={user.name}>{user.name}</Text>
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text>Approve</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Event");
        }}
      >
        <Text>Start Trip</Text>
      </TouchableOpacity>
    </View>
  );
}
