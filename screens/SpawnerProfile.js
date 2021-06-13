import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Platform,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Title, Button, List, ActivityIndicator,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getUser } from '../redux/actions/userActions';
import { createPin, saveVisit, removeVisit } from '../redux/actions/surveyActions';
import Modal from '../components/Modal';
import {
  FlowType,
  Visibility,
  WaterConditions,
  ViewingConditions,
} from '../constants/WaterAir';
import styles from '../styles/UserStyles';
import { SIZES } from '../constants/theme';

const SpawnerProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const visit = useSelector((state) => state.visit);
  const [loading, setLoading] = useState(false);
  const [flowModal, setFlowModal] = useState(false);
  const [waterModal, setWaterModal] = useState(false);
  const [visibilityModal, setVisibilityModal] = useState(false);
  const [viewingModal, setViewingModal] = useState(false);
  const iconColor = '#001a1a';

  const handleBackButton = () => true;

  // The following function disables android's back button
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  }, []);

  useEffect(() => BackHandler.removeEventListener('hardwareBackPress', handleBackButton), []);

  console.log(visit);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
      setLoading(false);
    }
  }, []);

  const navHandler = (type) => {
    navigation.navigate(type);
  };

  const sendToRedux = async () => {
    const result = await dispatch(saveVisit(visit, setLoading));
    if (result.type === 'SAVE_VISIT') {
      setLoading(false);
      dispatch(removeVisit())
        .then(() => navigation.navigate('Profile'));
    } else {
      console.log('error', result);
    }
    // });
  };

  const saveHandler = () => {
    setLoading(true);
    sendToRedux();
  };

  const navToNewPin = async (destination) => {
    await dispatch(createPin());
    navigation.navigate(destination);
  };

  const renderData = () => {
    if (visit.pins && visit.pins.length > 0) {
      return visit.pins.map((pin) => {
        let image = false;
        if (pin.images.length > 0) image = true;
        return ({
          id: JSON.stringify(Math.floor(Math.random() * 100)),
          title: pin.fish_status,
          fishSpecies: pin.fish_species,
          fishCount: pin.fish_count,
          image,
          comments: pin.comments,
          lat: pin.location.latitude,
          long: pin.location.longitude,
        });
      });
    }
    return undefined;
  };

  const Item = ({
    title, fishSpecies, fishCount, image, comments, lat, long,
  }) => (
    <View style={{ marginHorizontal: 15 }}>
      <Text style={{ fontWeight: '500' }}>
        <Icon name="fish" />
        {` Fish status: ${title}`}
      </Text>
      <Text>{`Fish species: ${fishSpecies}`}</Text>
      <Text>{`Fish count: ${fishCount}`}</Text>
      <Text>{image ? 'Image present' : 'No image present'}</Text>
      <Text>{`Location: ${lat} x ${long}`}</Text>
      <Text>{`Comments: ${comments}`}</Text>
    </View>
  );

  Item.propTypes = {
    title: PropTypes.string,
    fishSpecies: PropTypes.string,
    fishCount: PropTypes.number,
    image: PropTypes.bool,
    comments: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
  };

  Item.defaultProps = {
    title: '',
    fishSpecies: '',
    fishCount: 0,
    image: false,
    comments: '',
    lat: 0,
    long: 0,
  };

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      fishSpecies={item.fishSpecies}
      fishCount={item.fishCount}
      image={item.image}
      comments={item.comments}
      lat={item.lat}
      long={item.long}
    />
  );

  if (!visit) {
    return (
      <View style={{ margin: 100 }}>
        <Button
          onPress={() => navigation.navigate('DayStart')}
        >
          Go Back
        </Button>
      </View>
    );
  }
  return user && !loading ? (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <Modal
          update="flow_type"
          label="Water flow"
          text="What is the water flow type today?"
          modalVisible={flowModal}
          setModalVisible={setFlowModal}
          data={FlowType}
        />
        <Modal
          update="water_condition"
          label="Water condition"
          text="What is the water condition today?"
          modalVisible={waterModal}
          setModalVisible={setWaterModal}
          data={WaterConditions}
        />
        <Modal
          update="visibility"
          label="Visibility"
          text="What is the visibility like today?"
          modalVisible={visibilityModal}
          setModalVisible={setVisibilityModal}
          data={Visibility}
        />
        <Modal
          update="view_condition"
          label="Viewing condition"
          text="What are the viewing conditions today?"
          modalVisible={viewingModal}
          setModalVisible={setViewingModal}
          data={ViewingConditions}
        />
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
              onPress={() => setFlowModal(true)}
              title="Flow Type"
              description={visit.water_flow || 'Click to add'}
              left={() => <List.Icon color={iconColor} icon="water-outline" />}
            />
            <List.Item
              onPress={() => setWaterModal(true)}
              title="Water Conditions"
              description={visit.water_condition || 'Click to add'}
              left={() => <List.Icon color={iconColor} icon="water-outline" />}
            />
            <List.Item
              onPress={() => setVisibilityModal(true)}
              title="Visibility"
              description={visit.visibility || 'Click to add'}
              left={() => <List.Icon color={iconColor} icon="weather-partly-cloudy" />}
            />
            <List.Item
              onPress={() => setViewingModal(true)}
              title="View Condition"
              description={visit.view_condition || 'Click to add'}
              left={() => <List.Icon color={iconColor} icon="weather-partly-cloudy" />}
            />
          </List.Section>
          {visit.pins && (visit.pins.length > 0)
            && (
            <>
              <Title>Reports made on this visit</Title>
              <FlatList
                data={renderData()}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </>
            )}

        </View>
        <View style={styles.buttons}>
          <Button
            style={{ width: SIZES.width * 0.4 }}
            mode="contained"
            onPress={() => navToNewPin('FishOrRedd')}
          >
            Start
          </Button>
          <Button
            style={{ width: SIZES.width * 0.4 }}
            mode="contained"
            onPress={() => navHandler('ProjectMap')}
          >
            Map
          </Button>
        </View>
        <View style={styles.buttons}>
          <Button
            style={{ width: SIZES.width / 2, marginBottom: 15 }}
            mode="outlined"
            onPress={saveHandler}
          >
            Submit Visit Data
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <View style={{ height: SIZES.height, justifyContent: 'center' }}>
      <ActivityIndicator
        size="large"
        loading={loading}
      />
    </View>
  );
};

SpawnerProfile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

SpawnerProfile.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default SpawnerProfile;
