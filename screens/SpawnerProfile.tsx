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
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Title, Button, List, ActivityIndicator,
} from 'react-native-paper';
import { getUser } from '../redux/actions/userActions';
import { createPin, saveVisit, removeVisit } from '../redux/actions/surveyActions';
import Modal from '../components/Modal';
import {
  FlowType,
  Visibility,
  WaterConditions,
  ViewingConditions,
} from '../constants/WaterAir';
import { styles } from '../styles/UserStyles';
import { SIZES } from '../constants/Theme';
import { DefaultRootState } from '../interfaces/state';
import renderItem from '../components/questions/Item';
import dayjs from 'dayjs';

interface Props {
  navigation: {
    navigate: (page: string) => null;
  }
}

const SpawnerProfile = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: DefaultRootState) => state.user);
  const visit = useSelector((state: DefaultRootState) => state.visit);
  const [loading, setLoading] = useState<boolean>(false);
  const [flowModal, setFlowModal] = useState<boolean>(false);
  const [waterModal, setWaterModal] = useState<boolean>(false);
  const [visibilityModal, setVisibilityModal] = useState<boolean>(false);
  const [viewingModal, setViewingModal] = useState<boolean>(false);
  const iconColor = '#001a1a';

  const handleBackButton = () => true;

  // The following function disables android's back button
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  }, []);

  useEffect(() => BackHandler.removeEventListener('hardwareBackPress', handleBackButton), []);

  console.log(visit);

  useEffect(() => {
    if (!user.uid) {
      dispatch(getUser());
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!visit.creek_name || !visit.creek_name.length) {
      navigation.navigate('DayStart');
    }
  }, [])

  const navHandler = (type: string): void => {
    navigation.navigate(type);
  };

  const sendToRedux = async (): Promise<void> => {
    const result: any = await dispatch(saveVisit(visit));
    if (result.type === 'SAVE_VISIT') {
      setLoading(false);
      await dispatch(removeVisit())
      navigation.navigate('Profile');
    } else {
      console.log('error', result);
    }
  };

  const saveHandler = (): void => {
    setLoading(true);
    sendToRedux();
  };

  const navToNewPin = async (destination: string): Promise<void> => {
    await dispatch(createPin());
    navigation.navigate(destination);
  };

  const renderData = () => {
    if (visit.pins && visit.pins.length > 0) {
      return visit.pins.map((pin) => {
        let image = false;
        if (pin.images && pin.images.length > 0) image = true;
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

  if (!user.uid) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          <ScrollView>
            <Button onPress={() => navigation.navigate('SignIn')}>
              Sign In
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  return !loading ? (
    <SafeAreaView style={{ flex: 1 }}>
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
            <List.Item
              title="Creek Name"
              description={visit.creek_name || 'Not saved'}
              style={{ width: 350 }}
              left={() => <List.Icon icon="hydro-power" color={iconColor} />}
            />
            <List.Item
              title="Start Location"
              description={`Latitude: ${visit.start_location.latitude.toFixed(4)}\nLongitude: ${visit.start_location.longitude.toFixed(4)}`}
              left={() => <List.Icon color={iconColor} icon="ray-start-arrow" />}
            />
            <List.Item
              title="Start Time"
              description={dayjs(visit.started_at).format('MMMM D, YYYY [at] HH:mm a') || 'Not saved'}
              left={() => <List.Icon color={iconColor} icon="clock-start" />}
            />
            <List.Item
              title="Team Lead"
              description={visit.team_lead || 'Not saved'}
              left={() => <List.Icon color={iconColor} icon="face-recognition" />}
            />
            <List.Item
              title="Team Members"
              description={visit.team_members.map((member, i) => {
                if (visit.team_members.length === 1) return member;
                if (visit.team_members.length - i === 1) return ` and ${member}`
                if (visit.team_members.length - i === 2) return ` ${member}`
                if (visit.team_members.length >= 3) return ` ${member},`
              })}
              left={() => <List.Icon color={iconColor} icon="account-group" />}
            />
            <List.Item
              onPress={() => setFlowModal(true)}
              title="Flow Type"
              description={visit.flow_type || 'Click to add'}
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
            onPress={() => navToNewPin('TestTree')}
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
      </SafeAreaView>
  ) : (
    <View style={{ height: SIZES.height, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SpawnerProfile;
