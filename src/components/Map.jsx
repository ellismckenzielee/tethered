import React, { useState, useEffect, useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { getDeltas } from "../utils/utils.maps";
import * as Location from "expo-location";
import styles from "../styles/Login.Style";
import mapStyle from "../styles/Map.Style";
import { ellisArr, scottArr } from "../components/TestCoordinates";

export default function Map({ user, locations }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let mapRef = useRef(null);
  let maxLatitudeDelta;
  let maxLongitudeDelta;
  const animateToRegion = (location) => {
    mapRef.current.animateToRegion(location, 1000);
  };
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
        console.log("location found");
        setLocation(location);
      });
    })();
  }, []);
  console.log(location);
  if (location === null)
    return (
      <View>
        <Text>Map Loading...</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location.coords?.latitude,
          longitude: location.coords?.longitude,
          latitudeDelta: maxLatitudeDelta * 2,
          longitudeDelta: maxLongitudeDelta * 2,
        }}
      >
        <Polyline
          coordinates={scottArr}
          strokeColor="#F96800"
          strokeWidth={4}
        />
        <Polyline coordinates={ellisArr} strokeColor="#000" strokeWidth={4} />
        <Marker
          onPress={({ nativeEvent }) => {
            animateToRegion(
              {
                latitude: nativeEvent.coordinate.latitude,
                longitude: nativeEvent.coordinate.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              },
              1000
            );
          }}
          coordinate={{
            latitude: location.coords?.latitude,
            longitude: location.coords?.longitude,
          }}
        >
          <Image
            source={require("../assets/userMarker.png")}
            style={styles.marker}
          ></Image>
          <MapView.Callout>
            <Text>{user.name}</Text>
            <TouchableOpacity>
              <Text>Contact {user.name}</Text>
            </TouchableOpacity>
          </MapView.Callout>
        </Marker>
        {locations.map((location) => {
          return (
            <Marker
              onPress={({ nativeEvent }) => {
                animateToRegion(
                  {
                    latitude: nativeEvent.coordinate.latitude,
                    longitude: nativeEvent.coordinate.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  },
                  1000
                );
              }}
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
              <MapView.Callout>
                <Text>{location.name}</Text>
                <TouchableOpacity>
                  <Text>Contact {location.name}</Text>
                </TouchableOpacity>
              </MapView.Callout>
            </Marker>
          );
        })}
      </MapView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          animateToRegion(
            {
              latitude: location.coords?.latitude,
              longitude: location.coords?.longitude,
              latitudeDelta: maxLatitudeDelta * 2,
              longitudeDelta: maxLongitudeDelta * 2,
            },
            1000
          );
        }}
      >
        <Text>Group View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>End Trip</Text>
      </TouchableOpacity>
    </View>
  );
}
