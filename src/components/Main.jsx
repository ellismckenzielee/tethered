import React, { useContext, useEffect, useState } from "react";
import { TouchableHighlight, Image, RefreshControl, Text, View, SafeAreaView, ScrollView } from "react-native";
import styles from "../styles/Main.Style.js";
import { UserContext } from "../contexts/UserContext";
import { getGroupsByUserId } from "../utils/firestoreDatabaseUtils.jsx";
export default function Main({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [groups, setGroups] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const getGroups = async () => {
    setRefreshing(true);
    const groups = await getGroupsByUserId(currentUser.username);
    console.log(groups);
    setGroups(groups);
    setRefreshing(false);
  };
  console.log(currentUser.username);
  useEffect(() => {
    getGroups();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> {"Groups".toUpperCase()} </Text>
      <Text style={styles.subheading}>Please select a group to begin a trip! </Text>
      <ScrollView contentContainerStyle={{ justifyContent: "right" }} style={styles.scrollview} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getGroups} />}>
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
      </ScrollView>
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
    </SafeAreaView>
  );
}
