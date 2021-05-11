import React, { useState, useEffect } from "react";
import { Constants } from "expo";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, Button, View, Dimensions } from "react-native";

const CustomMarker = () => (
  <View
    style={{
      paddingVertical: 10,
      paddingHorizontal: 30,
      backgroundColor: "#007bff",
      borderColor: "#eee",
      borderRadius: 5,
      elevation: 10,
    }}
  >
    <Text style={{ color: "#fff" }}>CM</Text>
  </View>
);

const getLocationPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") return false;
  return true;
};

export default function App() {
  const [mapRegion, setMapRegion] = useState(null);
  const [hasLocationPermissions, setHasLocationPermissions] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [buttons, setButtons] = useState({
    centerMap: false,
    addPin: false,
    pinText: "Add Pin",
  });

  // eslint-disable-next-line no-unused-expressions
  useEffect(() => {
    const getLocPerm = async () => {
      const locPermission = await getLocationPermission();
      if (!locPermission) {
        setCurrentLocation("Permission to access location was denied");
      } else {
        setHasLocationPermissions(true);
        const loc = await Location.getCurrentPositionAsync({});
        setCurrentLocation(loc);
        setMapRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        });
      }
    };
    if (hasLocationPermissions === null) getLocPerm();
  }),
    [];

  const onMapPress = (e) => {
    if (buttons.addPin) {
      setMarkers(
        markers.concat({
          coordinate: e.nativeEvent.coordinate,
          key: markers[markers.length - 1]
            ? markers[markers.length - 1].key + 1
            : 1,
        })
      );
    }
  };

  const onRegionChange = (region) => {
    if (!buttons.centerMap) setMapRegion(region);
  };

  // useEffect(() => setCenter(false), [center]);
  const addPin = () => {
    if (!buttons.addPin)
      setButtons((prevButtons) => ({
        ...prevButtons,
        addPin: true,
        pinText: "Scrap Pins",
      }));
    else {
      setButtons((prevButtons) => ({
        ...prevButtons,
        addPin: false,
        pinText: "Add Pin",
      }));
      setMarkers([]);
    }
  };

  const centerMap = () => {
    setButtons((prevButtons) => ({ ...prevButtons, centerMap: true }));
    setMapRegion((prevRegion) => ({
      ...prevRegion,
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    }));
    // hack to set center to false after map has finished panning
    setTimeout(
      () => setButtons((prevButtons) => ({ prevButtons, centerMap: false })),
      300
    );
  };

  return currentLocation ? (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={(e) => onMapPress(e)}
        onRegionChange={onRegionChange}
      >
        <Marker coordinate={currentLocation.coords} />
        {markers.map((marker) => (
          <Marker key={marker.key} coordinate={marker.coordinate} />
        ))}
      </MapView>
      <View
        style={{
          position: "absolute", // use absolute position to show button on top of the map
          top: "50%", // for center align
          alignSelf: "flex-end", // for align to right
        }}
      >
        <Button title="Center" onPress={() => centerMap()} />
        <Button title={buttons.pinText} onPress={() => addPin()} />
      </View>
    </View>
  ) : (
    <Text> Loading... </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});