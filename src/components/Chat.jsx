import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableHighlight, KeyboardAvoidingView, Keyboard } from "react-native";
import styles from "../styles/Chat.Style";
import { UserContext } from "../contexts/UserContext";
import { watchGroupChat, sendMessage } from "../utils/utils.chat";

export default function Chat({ navigation, route }) {
  const { groupId } = route.params;
  const ref = useRef(null);
  const { isLoggedIn, currentUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const callback = function (response) {
    const items = [];
    response.forEach((item) => {
      const author = item.data().author;
      const message = item.data().message;
      items.push({ author, message });
    });
    setMessages(items);
    setIsLoading(false);
  };
  useEffect(async () => {
    const unsubscribe = watchGroupChat(groupId, callback);
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
    <KeyboardAvoidingView keyboardVerticalOffset={100} KeyboardAvoidingView={true} behavior={Platform.OS === "ios" ? "height" : "height"} style={styles.container}>
      <Text>ChatRoom: ID</Text>
      <ScrollView ref={(ref) => (this.scrollView = ref)} onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })} contentContainerStyle={{ padding: 15 }} style={styles.scrollView}>
        {messages.map((message, index) => {
          if (message.author === "ellis") {
            return (
              <View style={styles.messageContainer} key={message.author + index}>
                <Text style={styles.userTitle}>{message.author}</Text>
                <Text style={styles.userMessage}>{message.message}</Text>
              </View>
            );
          } else {
            return (
              <View style={styles.messageContainer} key={message.author + index}>
                <Text style={styles.messageAuthor}>{message.author}</Text>
                <Text style={styles.message}>{message.message}</Text>
              </View>
            );
          }
        })}
      </ScrollView>
      <View style={styles.userInput}>
        <TextInput placeholder="Enter Message Here" onChangeText={setMessage} style={styles.textInput}>
          {message}
        </TextInput>
        <TouchableHighlight
          onPress={() => {
            sendMessage(groupId, message, "ellis", setMessage);
            Keyboard.dismiss();
          }}
          style={styles.sendMessageButton}
        >
          <Text>Send</Text>
        </TouchableHighlight>
      </View>
    </KeyboardAvoidingView>
  );
}
