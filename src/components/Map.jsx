import React, { useState, useEffect, useRef, useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline, Callout } from "react-native-maps";
import { getDeltas } from "../utils/utils.maps";
import * as Location from "expo-location";
import styles from "../styles/Login.Style";

import mapStyle from "../styles/Map.Style";
import { updateLocation } from "../utils/firestoreDatabaseUtils";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { isLimitExceeded } from "../utils/utils.maps";
import { sendMessage } from "../utils/utils.chat";
import spoofer from "../utils/utils.location";
export default function Map({ user, locations, tripId }) {
  const { isLoggedIn, currentUser } = useContext(UserContext);
  const [location, setLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [groupSeparated, setGroupSeparated] = useState(false);
  const [members, setMembers] = useState({});
  const [tripData, setTripData] = useState({
    admin: null,
    archive: false,
    groupId: "1",
    groupName: null,
    trip: {
      started: true,
      tripId: null,
    },
    tripMembers: {
      cyclist: {
        latitude: 53.46743,
        longitude: -2.28421,
        username: "cyclist",
      },
    },
  });
  const navigation = useNavigation();
  useEffect(() => {
    setGroupSeparated(false);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = Location.watchPositionAsync({ distanceInterval: 100 }, (location) => {
        setLocation(location);
        updateLocation(currentUser.username, tripId, location.coords?.latitude, location.coords?.longitude);
      });
    })();
    return location;
  }, []);

  useEffect(() => {
    const spoof = spoofer.spoofLocation(spoofer.routes.ordsallRoute, 3000, "Ralf", tripId);
    const spoof2 = spoofer.spoofLocation(spoofer.routes.mainRoute, 3000, "Waldo", tripId);

    const unsub = onSnapshot(
      doc(db, "trips", tripId),
      (tripDocument) => {
        const source = tripDocument.metadata.hasPendingWrites ? "Local" : "Server";
        setTripData(() => {
          return tripDocument.data();
        });
        setMembers(() => {
          return Object.keys(tripDocument.data().tripMembers);
        });
      },
      []
    );
    return () => {
      setGroupSeparated(false);
      newLocations = [];
      unsub();
    };
  }, []);

  let newLocations = [];
  if (members.length > 1) {
    members.forEach((member) => {
      if (member !== currentUser.username) {
        newLocations.push(tripData.tripMembers[`${member}`]);
        return newLocations;
      }
    });
  }

  let mapRef = useRef(null);
  let maxLatitudeDelta;
  let maxLongitudeDelta;
  const animateToRegion = (location) => {
    mapRef.current.animateToRegion(location, 1000);
  };
  if (location) {
    const deltas = getDeltas(location, newLocations);
    maxLatitudeDelta = deltas.maxLatitudeDelta;
    maxLongitudeDelta = deltas.maxLongitudeDelta;
  }

  if (newLocations.length !== 0 && location !== false) {
    if (groupSeparated === true) {
      console.log("GROUP Sep", groupSeparated, "+++loc", location, "new", newLocations);
    }

    const limit = isLimitExceeded(2, location, newLocations);
    if (limit && !groupSeparated) {
      setGroupSeparated(true);
    } else if (!limit && groupSeparated) {
      setGroupSeparated(false);
    }

    newLocations = newLocations.sort((a, b) => a.username.localeCompare(b.username));
  }

  if (location === false || newLocations.length === 0) {
    return (
      <View>
        <Text>Map Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={groupSeparated && location !== false && newLocations.length > 0 ? mapStyle.dark : mapStyle.light}
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location.coords?.latitude,
          longitude: location.coords?.longitude,
          latitudeDelta: maxLatitudeDelta * 2,
          longitudeDelta: maxLongitudeDelta * 2,
        }}
      >
        {/* <Polyline
          coordinates={userCoords}
          strokeColor="#F96800"
          strokeWidth={2}
        /> */}

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
          <Image source={require("../assets/userMarker.png")} style={styles.marker}></Image>
        </Marker>
        {newLocations.map((location) => {
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
              <Image source={require("../assets/groupMarker.png")} style={styles.marker}></Image>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.mapButtons}
          onPress={() => {
            const groupId = tripData.groupId;
            navigation.navigate("Chat", { groupId });
          }}
        >
          <Text>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mapButtons}
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
        <TouchableOpacity
          style={styles.mapButtons}
          onPress={() => {
            navigation.navigate("Main");
          }}
        >
          <Text>End Trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
