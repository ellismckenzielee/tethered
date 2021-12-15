import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#2F2F2F",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
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
    flexGrow: 1,
    width: "95%",
    marginTop: 10,
    borderRadius: 10,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    width: "95%",
    justifyContent: "center",
  },
  mapButtons: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F96800",
    margin: 5,
    borderRadius: 10,
  },
});
