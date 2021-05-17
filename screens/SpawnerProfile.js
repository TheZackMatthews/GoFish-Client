import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Title, Button, List,
} from 'react-native-paper';
import { getUser } from '../redux/actions/userActions';
import styles from '../styles/UserStyles';
import { SIZES } from '../constants/theme';

function UserProfile({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const visit = useSelector((state) => state.visit);
  const iconColor = '#001a1a';
  console.log(visit);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const buttonHandler = (type) => {
    navigation.navigate(type);
  };

  const navigationFunc = (destination) => {
    navigation.navigate(destination);
  };

  const renderPins = () => (
    visit.pins.map((pin) => (
      <List.Item
        key={pin.id}
        title={pin.fish_species}
        description={`${pin.fish_count}\n${pin.fish_status}\n${Object.keys(pin.image_object).lenth}`}
        style={{ width: SIZES.width * 0.8 }}
      />
    ))
  );

  const member_map = () => {
    return visit.team_members.map((member) => ({key: member}))
  }

  return user ? (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <View style={styles.headContainer}>
          <Title>Spawner Tracking</Title>
        </View>
        <View style={styles.bodyContainer}>
          <List.Section>
            <List.Subheader>Field Visit</List.Subheader>
            <List.Item
              title="Creek Name"
              description={visit.creek_name || 'Not saved'}
              style={{ width: 350 }}
              left={() => <List.Icon icon="hydro-power" color={iconColor} />}
            />
            <List.Item
              title="Start Location"
              description={visit.start_location || 'Not saved'}
              left={() => <List.Icon color={iconColor} icon="ray-start-arrow" />}
            />
            <List.Item
              title="Start Time"
              description={visit.started_at || 'Not saved'}
              left={() => <List.Icon color={iconColor} icon="clock-start" />}
            />
            <List.Item
              title="Team Lead"
              description={visit.team_lead || 'Not saved'}
              left={() => <List.Icon color={iconColor} icon="face-recognition" />}
            />
            <List.Item
              title="Team Members"
              description={visit.team_members.map((member) => `${member}, `)}
              left={() => <List.Icon color={iconColor} icon="face-recognition" />}
            />
            <List.Item
              title="View Condition"
              description={visit.view_condition || 'Not saved'}
              left={() => <List.Icon color={iconColor} icon="weather-partly-cloudy" />}
            />
            <List.Item
              title="Water Condition"
              description={visit.water_condition || 'Not saved'}
              left={() => <List.Icon color={iconColor} icon="water-outline" />}
            />
          </List.Section>
          <List.Section>
            {visit.pins && (visit.pins.length > 0)
            && (
            <>
              <List.Subheader>Reports made on this visit</List.Subheader>
              {/* {renderPins()} */}
            </>
            )}
          </List.Section>
        </View>
        <View style={styles.buttons}>
          <Button
            style={{ width: SIZES.width / 4 }}
            mode="outlined"
            onPress={() => navigationFunc('FishOrRedd')}
          >
            Start
          </Button>
          <Button
            style={{ width: SIZES.width / 4 }}
            mode="outlined"
            onPress={() => navigationFunc('ProjectMap')}
          >
            Map
          </Button>
          <Button
            style={{ width: SIZES.width / 4 }}
            mode="outlined"
            onPress={() => navigationFunc('Camera')}
          >
            Camera
          </Button>
        </View>
        <View style={styles.buttons}>
          <Button
            style={{ width: SIZES.width / 3 }}
            mode="outlined"
            onPress={() => buttonHandler('preferences')}
          >
            Finish Visit
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <View><Text>Project not found.</Text></View>
  );
}

UserProfile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

UserProfile.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default UserProfile;
