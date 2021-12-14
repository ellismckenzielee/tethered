import React, { useContext, useState } from "react";
import { TouchableHighlight, Image, TextInput, Text, View } from "react-native";
import styles from "../styles/Main.Style.js";
import { UserContext } from "../contexts/UserContext";
import { handleLogin } from "../utils/firebaseAuthUtils";

export default function Main({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [groups, setGroups] = useState([
    { id: "dgrdg", name: "Wales Squad" },
    { id: "dggmhhrdg", name: "Manchester Ring Road" },
  ]);
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
            key={group.id}
            style={styles.groupCard}
            onPress={() => {
              navigation.navigate("Lobby", { groupPath: group.id });
            }}
          >
            <Text>{group.name}</Text>
          </TouchableHighlight>
        );
      })}
    </View>
  );
}
