import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#2F2F2F",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 45,
    color: "white",
    marginBottom: 30,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#F96800",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 2,
    paddingBottom: 5,
    borderRadius: 15,
    margin: 10,
    marginBottom: 30,
    shadowColor: "#000000",
    shadowOpacity: 0.7,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  text: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  Btntext: {
    fontSize: 18,
    color: "white",
  },
  logo: {
    width: 227,
    height: 200,
    marginBottom: 30,
    resizeMode: "contain",
  },
  textInput: {
    backgroundColor: "#E3E3E3",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 2,
    paddingBottom: 5,
    borderRadius: 15,
    marginBottom: 30,
  },
  Smltext: {
    fontSize: 12,
    fontWeight: "100",
    color: "white",
    marginBottom: 5,
  },
  scrollView: {
    width: "97%",
    height: 50,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  messageContainer: {
    borderRadius: 10,
    marginBottom: 10,
  },
  messageAuthor: {
    fontWeight: "bold",
  },
  message: {
    padding: 10,
    width: "100%",
  },
  userInput: { width: "100%", display: "flex", flexDirection: "row", padding: 10, paddingBottom: 50 },
  textInput: {
    width: "70%",
    marginTop: 10,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 3,
  },
  sendMessageButton: { width: "30%", backgroundColor: "#F96800", marginTop: 10, padding: 20, borderRadius: 10, textAlign: "center", borderColor: "black", borderWidth: 3 },
  userTitle: {
    fontWeight: "bold",
    color: "#F96800",
    textAlign: "right",
  },
  userMessage: {
    padding: 10,
    width: "100%",
    textAlign: "right",
  },
});
