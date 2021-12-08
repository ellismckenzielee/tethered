import React, { useState, useEffect } from "react";
import { Image, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import getDeltas from "../utils/utils.maps";
import * as Location from "expo-location";
import styles from "../styles/Login.Style";
import mapStyle from "../styles/Map.Style";

export default function Map({ user, locations }) {
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
    <MapView
      provider={PROVIDER_GOOGLE}
      customMapStyle={mapStyle}
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
  );
}
