import React, { useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../styles/Login.Style";
import Map from "./Map";
import { UserContext } from "../contexts/UserContext";

export default function Lobby({ navigation }) {
  const { isLoggedIn, currentUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
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
