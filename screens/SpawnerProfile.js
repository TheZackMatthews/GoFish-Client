import React, { useEffect } from 'react';
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
  Title, Button, List, Paragraph,
} from 'react-native-paper';
import { getUser } from '../redux/actions/userActions';
import { createPin } from '../redux/actions/surveyActions';
import styles from '../styles/UserStyles';
import { SIZES } from '../constants/theme';

function UserProfile({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const visit = useSelector((state) => state.visit);
  const iconColor = '#001a1a';

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const navHandler = (type) => {
    navigation.navigate(type);
  };

  const navToNewPin = async (destination) => {
    await dispatch(createPin());
    navigation.navigate(destination);
  };

  let image = false;

  const DATA = visit.pins.map((pin) => {
    if (pin.image_object.url.length > 0) image = true;
    return ({
      id: Math.floor(Math.random() * 10),
      title: pin.fish_status,
      fishSpecies: pin.fish_species,
      fishCount: pin.fish_count,
      image,
      comments: pin.comments,
    });
  });

  const Item = ({
    title, fishSpecies, fishCount, image, comments,
  }) => (
    <View style={{ marginHorizontal: 15 }}>
      <Title>{`Fish status: ${title}`}</Title>
      <Paragraph>{`Fish species: ${fishSpecies}`}</Paragraph>
      <Paragraph>{`Fish count: ${fishCount}`}</Paragraph>
      <Paragraph>{image ? 'Image present' : 'No image present'}</Paragraph>
      <Paragraph>{comments}</Paragraph>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      fishSpecies={item.fishSpecies}
      fishCount={item.fishCount}
      image={item.image}
      comments={item.comments}
    />
  );

  // const renderPins = () => (visit.pins.map((pin) => {
  //   const data = [
  //     {
  //       title: `Fish status: ${pin.fish_status}`,
  //       key: Math.floor(Math.random() * 10),
  //     },
  //     {
  //       title: `Fish species: ${pin.fish_species}`,
  //       key: Math.floor(Math.random() * 10),
  //     },
  //     {
  //       title: `Fish count: ${pin.fish_count}`,
  //       key: Math.floor(Math.random() * 10),

  //     },
  //   ];
  //   return (
  //     <View>
  //       <Text>{pin.status}</Text>
  //       <FlatList
  //         data={data}
  //       />
  //     </View>
  //   );
  // }));

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
              description={`Latitude: ${visit.start_location.latitude}\nLongitude: ${visit.start_location.longitude}`}
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
              left={() => <List.Icon color={iconColor} icon="account-group" />}
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
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </>
            )}
          </List.Section>
        </View>
        <View style={styles.buttons}>
          <Button
            style={{ width: SIZES.width / 4 }}
            mode="outlined"
            onPress={() => navToNewPin('FishOrRedd')}
          >
            Start
          </Button>
          <Button
            style={{ width: SIZES.width / 4 }}
            mode="outlined"
            onPress={() => navHandler('ProjectMap')}
          >
            Map
          </Button>
          <Button
            style={{ width: SIZES.width / 4 }}
            mode="outlined"
            onPress={() => navHandler('Camera')}
          >
            Camera
          </Button>
        </View>
        <View style={styles.buttons}>
          <Button
            style={{ width: SIZES.width / 3 }}
            mode="outlined"
            onPress={() => navHandler('VisitSummary')}
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
