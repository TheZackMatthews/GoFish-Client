import React, { useState, useEffect } from 'react';
import { Constants } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import isEqual from 'lodash/isEqual';
import {
  StyleSheet, Text, Button, View, Dimensions, TouchableOpacity, Image,
} from 'react-native';
import MyLocationMapMarker from '../components/maps/MyLocationMarker';
import LocationModal from '../components/maps/LocationModal';
import * as buttonCenter from '../assets/centerMap.png';

const CustomMarker = () => (
  <View
    style={{
      paddingVertical: 10,
      paddingHorizontal: 30,
      backgroundColor: '#007bff',
      borderColor: '#eee',
      borderRadius: 5,
      elevation: 10,
    }}
  >
    <Text style={{ color: '#fff' }}>CM</Text>
  </View>
);

const getLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return false;
  return true;
};

export default function App() {
  const [mapRegion, setMapRegion] = useState(null);
  const [hasLocationPermissions, setHasLocationPermissions] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [modal, setModal] = useState({ visible: false, pinDropped: false });
  const [buttons, setButtons] = useState({
    addPin: false,
    pinText: 'Add Pin',
  });

  // gets permissions and initial location
  // eslint-disable-next-line no-unused-expressions
  useEffect(() => {
    const getLocPerm = async () => {
      const locPermission = await getLocationPermission();
      if (!locPermission) {
        setCurrentLocation('Permission to access location was denied');
      } else {
        setHasLocationPermissions(true);
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
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

  // if marker added, open modal
  useEffect(() => {
    if (markers.length) setModal((prev) => ({ ...prev, visible: true, pinDropped: true }));
  }, [markers]);

  // if add pin has been clicked, add pin on map press
  const onMapPress = (e) => {
    if (buttons.addPin && !markers.length) {
      setMarkers(
        markers.concat({
          coordinate: e.nativeEvent.coordinate,
          key: markers[markers.length - 1] ? markers[markers.length - 1].key + 1 : 1,
        }),
      );
    }
  };

  // drop new pin
  const dropPin = () => {
    setMarkers([]);
    setModal((prev) => ({ ...prev, visible: false }));
    setButtons((prevButtons) => ({
      ...prevButtons,
      addPin: true,
    }));
  };

  const centerMap = async () => {
    //    const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    //   setCurrentLocation(loc);
    setMapRegion((prevRegion) => ({
      ...prevRegion,
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    }));
  };

  const locationFromChild = (data) => {
    setCurrentLocation(data);
  };

  return currentLocation ? (
    <View style={styles.container}>
      <LocationModal commands={modal} dropPin={dropPin} />
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={(e) => onMapPress(e)}
        /* onRegionChange={onRegionChange} */
      >
        <MyLocationMapMarker dataToParent={locationFromChild} />

        {markers.map((marker) => (
          <Marker key={marker.key} coordinate={marker.coordinate} />
        ))}
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => centerMap()}>
          <Image source={require('../assets/centerMap.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModal((prev) => ({ ...prev, visible: true }))}
        >
          <Image source={require('../assets/dropPin_60px.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addPin()}>
          <Image source={require('../assets/goToForm.png')} />
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <Text style={{ alignSelf: 'center', top: '50%' }}> Loading... </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '0%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#ff3399',
    borderRadius: 12,
    padding: 5,
    margin: 20,
    opacity: 0.7,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
});
