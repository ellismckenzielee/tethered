import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, TouchableHighlight, Text } from "react-native";
import styles from "../styles/Lobby.Style";
import { UserContext } from "../contexts/UserContext";
import QRCode from "react-native-qrcode-svg";

export default function Lobby({ navigation, route }) {
  const { isLoggedIn, currentUser } = useContext(UserContext);
  const isAdmin = true;
  const event = {
    hasStarted: false,
    admin: "uiudsiudsig",
    users: [
      { name: "Bob", accepted: true, isAdmin: false },
      { name: "Stuart", accepted: false, isAdmin: false },
      { name: "Tom", accepted: false, isAdmin: true },
    ],
  };

  const { users } = event;
  const approvedUsers = users.filter((user) => user.accepted);
  const pendingUsers = users.filter((user) => !user.accepted);
  const [approved, setApproved] = useState(false);

  const { groupPath } = route.params;
  const logo = require("../assets/logo.png");

  useEffect(() => {
    setTimeout(() => {
      setApproved(true);
    }, 3000);
  });
  if (!approved)
    return (
      <View style={styles.waiting}>
        {/* <Image source={require('../assets/waiting.gif')} style={styles.logo} /> */}
        <Text style={styles.title}>Waiting approval...</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      {approvedUsers.map((user) => {
        return (
          <Text style={styles.text} key={user.name}>
            {user.name}
          </Text>
        );
      })}
      {isAdmin &&
        pendingUsers.map((user) => {
          return (
            <View key={user.name}>
              <Text style={styles.text} key={user.name}>
                {user.name}
              </Text>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#9F4300"
                style={styles.button}
                onPress={() => {}}
              >
                <Text>Approve</Text>
              </TouchableHighlight>
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

      {/* Need to change groupPath from create a group to the groupId */}
      <QRCode
        value={groupPath}
        size={200}
        logo={logo}
        logoSize={55}
        logoBackgroundColor="black"
      />
    </View>
  );
}
