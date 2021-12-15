import React, { useContext, useEffect, useState } from "react";
import { TouchableHighlight, Image, TextInput, Text, View } from "react-native";
import styles from "../styles/Main.Style.js";
import { UserContext } from "../contexts/UserContext";
import { getGroupsByUserId } from "../utils/firestoreDatabaseUtils.jsx";
export default function Main({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [groups, setGroups] = useState([]);
  console.log(currentUser.username);
  useEffect(() => {
    (async () => {
      const groups = await getGroupsByUserId(currentUser.username);
      console.log(groups);
      setGroups(groups);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#9F4300"
        style={styles.button}
        onPress={() => {
          navigation.navigate("CreateGroup");
        }}
      >
        <Text style={styles.Btntext}>Create Group</Text>
      </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#9F4300"
        style={styles.button}
        onPress={() => {
          navigation.navigate("JoinGroup");
        }}
      >
        <Text style={styles.Btntext}>Join Group</Text>
      </TouchableHighlight>
      {groups.map((group) => {
        return (
          <TouchableHighlight
            key={group.groupId}
            style={styles.groupCard}
            onPress={() => {
              navigation.navigate("Lobby", { groupPath: group.groupId });
            }}
          >
            <Text>{group.groupName}</Text>
          </TouchableHighlight>
        );
      })}
    </View>
  );
}
