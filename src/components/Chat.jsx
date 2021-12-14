import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import styles from "../styles/Chat.Style";
import { UserContext } from "../contexts/UserContext";
import { watchGroupChat } from "../utils/utils.chat";

export default function Chat({ navigation, groupId }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    const unsubscribe = watchGroupChat("chatRoom", callback);
    return () => {
      unsubscribe();
    };
  }, []);
  if (isLoading)
    return (
      <View style={styles.container}>
        <Text>Messages Loading</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      {messages.map((message) => {
        return <Text key={message.author}>{message.author}</Text>;
      })}
    </View>
  );
}
