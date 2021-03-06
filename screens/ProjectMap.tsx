import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker, Region, MapTypes, LatLng, MapEvent } from 'react-native-maps';
import {
  StyleSheet, Text, Button, View, Dimensions, TouchableOpacity, Image, NativeSyntheticEvent
} from 'react-native';
import { useDispatch } from 'react-redux';
import { submitLocation, createPin } from '../redux/actions/surveyActions';
import MyLocationMapMarker from '../components/maps/MyLocationMarker';
import LocationModal from '../components/maps/LocationModal';
import { COLORS } from '../constants/Theme';
import { LocationObject } from 'expo-location';

// const CustomMarker = () => (
// <View
// style={{
// paddingVertical: 10,
// paddingHorizontal: 30,
// backgroundColor: '#007bff',
// borderColor: '#eee',
// borderRadius: 5,
// elevation: 10,
// }}
// >
//    <Text style={{ color: '#fff' }}>CM</Text>
// </View>
// );

const getLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return false;
  return true;
};

// not used
const debounce = (cb: (...args: any[]) => void, delay: number) => {
  let timer: boolean;
  return function (...args: any[]) {
    if (timer) return;
    cb(...args);
    timer = true;
    setTimeout(() => {
      timer = false;
    }, delay);
  };
};

// when you do any action on the map, view returns to map region
interface Props {
  navigation: {
    navigate: (page: string) => null;
  }
}

interface IMarker {
  coordinate: {
    latitude: number,
    longitude: number,
  },
  key: number,
}

interface IModal {
  visible: boolean,
  pinDropped: boolean,
}

interface IButton {
  addPin: boolean,
  mapType: MapTypes,
}
export default function ProjectMap({ navigation }: Props) {
  const dispatch = useDispatch();
  const [mapRegion, setMapRegion] = useState<Region | undefined>(undefined);
  const [hasLocationPermissions, setHasLocationPermissions] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(null);
  const [markers, setMarkers] = useState<IMarker[] | null>(null);
  const [modal, setModal] = useState<IModal>({ visible: false, pinDropped: false });
  const [buttons, setButtons] = useState<IButton>({
    addPin: false,
    mapType: 'terrain',
  });

  // toggles drop pin functionality and modal
  const setMapState = (dropPin = false) => {
    // accepts only one marker
    setMarkers(null);
    setModal((prev) => ({ ...prev, visible: false, pinDropped: dropPin }));
    setButtons((prevButtons) => ({
      ...prevButtons,
      addPin: dropPin,
    }));
  };

  const submitLocationHandler = async () => {
    try {
      if (markers && markers.length > 1) throw new Error('Too many map markers!');
      if (!currentLocation) throw new Error ('Current location not found.')
      const loc: LatLng = markers && markers[0] ? markers[0].coordinate : currentLocation.coords;
      const sendLocation = {
        latitude: loc.latitude,
        longitude: loc.longitude,
      }
      const result: any = await dispatch(submitLocation(sendLocation));
      await dispatch(createPin(sendLocation));
      if (result && result.payload) {
        setMapState(); // resets map state
        navigation.navigate('TestTree');
      } else {
        throw new Error('Location could not be saved!');
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  const toggleBaseMap = () => {
    setButtons((prev) => {
      const map: MapTypes = prev.mapType === 'satellite' ? 'terrain' : 'satellite';
      return { ...prev, mapType: map };
    });
  };
  // gets permissions and initial location
  // eslint-disable-next-line no-unused-expressions
  useEffect(() => {
    const getLocPerm = async () => {
      const locPermission = await getLocationPermission();
      try {
        if (!locPermission) {
          throw new Error('Location permissions not granted.')
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
      } catch (error) {
        console.log(error.message)
      }
    };
    if (!hasLocationPermissions) getLocPerm();
  }), [];

  //   follows user location
  useEffect(() => {
    if (currentLocation && mapRegion) {
      const latDiff = Math.abs(mapRegion.latitude - currentLocation.coords.latitude);
      const lngDiff = Math.abs(mapRegion.longitude - currentLocation.coords.longitude);
      if (latDiff > 0.002 || lngDiff > 0.001) {
        setTimeout(
          () => setMapRegion((prevRegion: Region | undefined) => ({
            ...prevRegion,
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          })),
          500,
        );
      }
    }
  }, [currentLocation]);

  // if marker added, open modal
  useEffect(() => {
    if (markers && markers.length) setModal((prev) => ({ ...prev, visible: true, pinDropped: true }));
  }, [markers]);

  // if 'add pin' has been clicked, add pin on map press
  const onMapPress = (e: MapEvent) => {
    if (markers && buttons.addPin && !markers.length) {
      setMarkers(
        markers.concat({
          coordinate: e.nativeEvent.coordinate,
          key: markers[markers.length - 1] ? markers[markers.length - 1].key + 1 : 1,
        })
      );
    } else if (buttons.addPin) {
      setMarkers([{
        coordinate: e.nativeEvent.coordinate,
        key: 1,
      }])
    }
  };

  const onRegionChange = (region: Region) => {
    setMapRegion(region);
  };

  const centerMap = () => {
    if (currentLocation && currentLocation.coords) {
      setMapRegion((prevRegion: Region | undefined) => ({
        ...prevRegion,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.04,
      }));
    }
  };

  // gets location from MyLocationMapMarker
  const locationFromChild = (data: LocationObject) => {
    setCurrentLocation(data);
  };

  return currentLocation ? (
    <View style={styles.container}>
      <LocationModal
        commands={modal}
        dropPin={setMapState}
        submitLocation={submitLocationHandler}
      />
      <MapView
        mapType={buttons.mapType}
        style={styles.map}
        region={mapRegion}
        onPress={(e) => onMapPress(e)}
        onRegionChangeComplete={onRegionChange}
      >
        <MyLocationMapMarker
          dataToParent={locationFromChild} />

        {markers && markers.map((marker) => (
          <Marker key={marker.key} coordinate={marker.coordinate} />
        ))}
      </MapView>
      <View style={styles.mapControlContainer}>
        <TouchableOpacity
          style={[styles.button, styles.button_mapControl]}
          onPress={() => toggleBaseMap()}
        >
          <Image source={require('../assets/mapIcons/toggleBaseMap_40px.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.button_mapControl]}
          onPress={() => centerMap()}
        >
          <Image source={require('../assets/mapIcons/centerMap_40px.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SpawnerProfile')}
        >
          <Image source={require('../assets/mapIcons/instructions.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModal((prev) => ({ ...prev, visible: true }))}
        >
          <Image source={require('../assets/mapIcons/dropPin_60px.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ReferenceInfo')}
        >
          <Image source={require('../assets/mapIcons/fishIcon.png')} />
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
    ...StyleSheet.absoluteFillObject,
    // width: Dimensions.get('screen').width,
    // height: Dimensions.get('screen').height,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '0%',
    alignSelf: 'center',
  },
  mapControlContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    position: 'absolute',
    top: '5%',
    alignSelf: 'flex-end',
  },
  button: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 12,
    padding: 5,
    margin: 20,
    opacity: 0.7,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
  button_mapControl: {
    margin: 8,
  },
});
