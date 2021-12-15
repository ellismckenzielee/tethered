import React, { useContext } from "react";
import { View, Button } from "react-native";
import styles from "../styles/Login.Style";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";

export default function Logout() {
  const { setCurrentUser, isLoggedIn } = useContext(UserContext);
  const navigation = useNavigation();
  if (!isLoggedIn) return <></>;
  else {
    return (
      <Button
        onPress={() => {
          setCurrentUser({});
          navigation.navigate("Home");
        }}
        title={"Logout"}
      ></Button>
    );
  }
}
