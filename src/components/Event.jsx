import React, { useContext, useState } from "react";
import { Button, Image, TextInput, Text, View, TouchableOpacity } from "react-native";
import styles from "../styles/Login.Style";
import { UserContext } from "../contexts/UserContext";
import MapView, { Marker } from "react-native-maps";
import getDeltas from "../utils/utils.maps";

export default function Event({ navigation }) {
  const { isLoggedIn, currentUser } = useContext(UserContext);
  const user = { name: "Ellis", latitude: 53.46744, longitude: -2.28477 };
  const locations = [
    { name: "Scott", latitude: 53.45744, longitude: -2.28477 },
    { name: "Sam", latitude: 53.47744, longitude: -2.28477 },
    { name: "Tom", latitude: 53.430156, longitude: -2.335864 },
  ];
  const { maxLatitudeDelta, maxLongitudeDelta } = getDeltas(user, locations);
  console.log(maxLatitudeDelta, maxLongitudeDelta);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: user.latitude,
          longitude: user.longitude,
          latitudeDelta: maxLatitudeDelta * 2,
          longitudeDelta: maxLongitudeDelta * 2,
        }}
      >
        <Marker coordinate={{ latitude: user.latitude, longitude: user.longitude }}>
          <Image source={require("../assets/userMarker.png")} style={styles.marker}></Image>
        </Marker>
        {locations.map((location) => {
          return (
            <Marker key={location.name} coordinate={{ latitude: location.latitude, longitude: location.longitude }}>
              <Image source={require("../assets/groupMarker.png")} style={styles.marker}></Image>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}
