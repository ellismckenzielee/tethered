import React, { useState, useEffect } from "react";
import { TouchableHighlight, Image, TextInput, Text, View, StyleSheet } from "react-native";
import styles from "../styles/createGroup.Style";
import QRCode from "react-native-qrcode-svg";

export default function CreateGroup() {
  const [groupLink, setGroupLink] = useState(" ");
  const [qrLink, setQrLink] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

  const logo = require("../assets/logo.png");
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Create a Group</Text>
      <Text style={styles.text}>Group Name</Text>
      <Text style={styles.Smltext}>e.g. teamTethered</Text>
      <TextInput
        style={styles.textInput}
        placeholder="TeamTethered"
        value={groupLink}
        onChangeText={(text) => {
          setGroupLink(text);
        }}
      />
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#9F4300"
        style={styles.button}
        onPress={() => {
          setQrLink(groupLink);
        }}
      >
        <Text style={styles.Btntext}>Create Group</Text>
      </TouchableHighlight>
      <QRCode style={styles.qr} value={qrLink} size={200} />
    </View>
  );
}
