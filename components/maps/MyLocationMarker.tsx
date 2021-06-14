// https://github.com/react-native-maps/react-native-maps/blob/master/example/examples/MyLocationMapMarker.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View, PermissionsAndroid, Platform,
} from 'react-native';
import { Marker, MarkerProps } from 'react-native-maps';
import * as Location from 'expo-location';
import isEqual from 'lodash/isEqual';
import { COLORS } from '../../constants/Theme';

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
};
const ANCHOR = { x: 0.5, y: 0.5 };

const colorOfmyLocationMapMarker: string = COLORS.purple;

interface Props extends MarkerProps {
  coordinate: {
    latitude: number,
    longitude: number,
  },
  mounted: boolean,
  heading: number,
  children: React.FC,
  geolocationOptions: {
    enableHighAccuracy: boolean,
    timeout: number,
    maximumAge: number,
  },
  enableHack: boolean,
  dataToParent: any,
}

const MyLocationMapMarker = ({
  mounted,
  coordinate,
  children,
  dataToParent,
  geolocationOptions = GEOLOCATION_OPTIONS,
  heading,
  enableHack = false,
}: Props) => {
  const [myPosition, setMyPosition] = React.useState<any>(null)
  let watchID: any;

  const watchLocation = async () => {
    watchID = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High },
      (position) => {
        const myLastPosition = myPosition;
        let tempPosition = position.coords;
        if (!isEqual(tempPosition, myLastPosition)) {
          dataToParent(position);
          setMyPosition({ myPosition });
        }
      },
    );
    }

  React.useEffect(() => {
    mounted = true;
    if (coordinate) return;
    watchLocation();
    return () => {
      mounted = false;
      if (watchID) {
        watchID.remove();
      }
    }
  }, [])

    if (!coordinate) {
      if (!myPosition) {
        return null;
      }
      coordinate = myPosition;
      heading = myPosition.heading;
    }

    const rotate = typeof heading === 'number' && heading >= 0 ? `${heading}deg` : null;

    return (
      <Marker anchor={ANCHOR} style={styles.mapMarker} coordinate={coordinate}>
        <View style={styles.container}>
          <View style={styles.markerHalo} />
          {rotate && (
            <View style={[styles.heading, { transform: [{ rotate }] }]}>
              <View style={styles.headingPointer} />
            </View>
          )}
          <View style={styles.marker}>
            <Text style={styles.markerText}>{enableHack && rotate}</Text>
          </View>
        </View>
        {children}
      </Marker>
    );
}

const SIZE = 20;
const HALO_RADIUS = 4;
const ARROW_SIZE = 7;
const ARROW_DISTANCE = 6;
const HALO_SIZE = SIZE + HALO_RADIUS;
const HEADING_BOX_SIZE = HALO_SIZE + ARROW_SIZE + ARROW_DISTANCE;

const styles = StyleSheet.create({
  mapMarker: {
    zIndex: 1000,
  },
  // The container is necessary to protect the markerHalo shadow from clipping
  container: {
    width: HEADING_BOX_SIZE,
    height: HEADING_BOX_SIZE,
  },
  heading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: HEADING_BOX_SIZE,
    height: HEADING_BOX_SIZE,
    alignItems: 'center',
  },
  headingPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: ARROW_SIZE * 0.75,
    borderBottomWidth: ARROW_SIZE,
    borderLeftWidth: ARROW_SIZE * 0.75,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colorOfmyLocationMapMarker,
    borderLeftColor: 'transparent',
  },
  markerHalo: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    width: HALO_SIZE,
    height: HALO_SIZE,
    borderRadius: Math.ceil(HALO_SIZE / 2),
    margin: (HEADING_BOX_SIZE - HALO_SIZE) / 2,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  marker: {
    justifyContent: 'center',
    backgroundColor: colorOfmyLocationMapMarker,
    width: SIZE,
    height: SIZE,
    borderRadius: Math.ceil(SIZE / 2),
    margin: (HEADING_BOX_SIZE - SIZE) / 2,
  },
  markerText: { width: 0, height: 0 },
});
