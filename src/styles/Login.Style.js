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
    marginBottom: 15,
  },
  Btntext: {
    fontSize: 18,
    color: "white",
  },
  logo: {
    width: 227,
    height: 332,
    marginBottom: 30,
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
  map: {
    width: "95%",
    height: "90%",
    marginTop: 50,
    borderRadius: 10,
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#E3E3E3",
    borderRadius: 6,
    borderColor: "#F96800",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  bubbleText: {
    paddingBottom: 5,
  },
  bubbleBtn: {
    backgroundColor: "#F96800",
    borderRadius: 6,
    borderColor: "#2F2F2F",
    padding: 2,
  },
  calloutImage: {
    width: 100,
    height: 50,
    resizeMode: "stretch",
  },
});
