import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableHighlight } from "react-native";
import styles from "../styles/Chat.Style";
import { UserContext } from "../contexts/UserContext";
import { watchGroupChat } from "../utils/utils.chat";

export default function Chat({ navigation, groupId }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log("updates", messages);
  const callback = function (response) {
    const items = [];
    response.forEach((item) => {
      const author = item.data().author;
      items.push({ author });
    });
    setMessages(items);
    setIsLoading(false);
  };
  useEffect(async () => {
    // const unsubscribe = watchGroupChat("chatRoom", callback);
    // return () => {
    //   unsubscribe();
    // };
  }, []);
  if (isLoading)
    return (
      <View style={styles.container}>
        <Text>Messages Loading</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <Text>ChatRoom: ID</Text>
      <ScrollView style={styles.scrollView}>
        {[
          { author: "Ellis", message: "dfdhdtbtdbdbdtbrtbtr" },
          { author: "Jim", message: "dfbdrgbdrbfnfmgym" },
        ].map((message) => {
          return (
            <View key={message.author}>
              <Text style={styles.messageAuthor}>{message.author}</Text>
              <Text style={styles.message}>{message.message}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.userInput}>
        <TextInput style={styles.textInput}>Text Input Box</TextInput>
        <TouchableHighlight
          onPress={() => {
            postMessage(groupId, message, author);
          }}
          underlayColor="#DDDDDD"
          style={styles.sendMessageButton}
        >
          <Text>Send</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
