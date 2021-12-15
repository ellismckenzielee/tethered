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
  groupCard: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    marginTop: 10,
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
  scrollview: {
    width: "100%",
  },
});
