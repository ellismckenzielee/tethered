import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Image,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/Login.Style";
import { UserContext } from "../contexts/UserContext";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import getDeltas from "../utils/utils.maps";
import * as Location from "expo-location";

export default function Event({ navigation }) {
  const { isLoggedIn, currentUser } = useContext(UserContext);
  const user = {
    name: "Ellis",
    latitude: 53.43015321229701,
    longitude: -2.235823473023755,
  };
  const locations = [
    { name: "Scott", latitude: 53.45744, longitude: -2.28477 },
    { name: "Sam", latitude: 53.47744, longitude: -2.28777 },
    { name: "Tom", latitude: 53.430156, longitude: -2.365864 },
  ];
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  let maxLatitudeDelta;
  let maxLongitudeDelta;

  if (location !== null) {
    const deltas = getDeltas(location, locations);
    maxLatitudeDelta = deltas.maxLatitudeDelta;
    maxLongitudeDelta = deltas.maxLongitudeDelta;
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      Location.watchPositionAsync({ distanceInterval: 100 }, (location) => {
        setLocation(location);
      });
    })();
  }, []);

  if (location === null)
    return (
      <View>
        <Text>Map Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text>{location.coords?.latitude}</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location.coords?.latitude,
          longitude: location.coords?.longitude,
          latitudeDelta: maxLatitudeDelta * 2,
          longitudeDelta: maxLongitudeDelta * 2,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords?.latitude,
            longitude: location.coords?.longitude,
          }}
        >
          <Image
            source={require("../assets/userMarker.png")}
            style={styles.marker}
          ></Image>
        </Marker>
        {locations.map((location) => {
          return (
            <Marker
              key={location.name}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            >
              <Image
                source={require("../assets/groupMarker.png")}
                style={styles.marker}
              ></Image>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}
