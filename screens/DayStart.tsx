import React, { useState, useEffect } from 'react';
import {
  ScrollView, Platform, Alert, View,
} from 'react-native';
import {
  Checkbox,
  Title,
  Paragraph,
  Button,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import style from '../styles/DayStartStyles';
import { getUser } from '../redux/actions/userActions';
import { initializeFieldVisit, removeVisit } from '../redux/actions/surveyActions';
import { SIZES } from '../constants/Theme';
import BackNext from '../components/questions/BackNext';
import { DefaultRootState } from '../interfaces/state';
import Team from '../components/questions/Team';
import Liability from '../components/questions/Liability';
import AutoComplete from '../components/questions/AutoComplete';
import { creekList } from '../constants/creeknames.json';
import { SafeAreaView } from 'react-native-safe-area-context';

const safetyAgreement = 'I certify that all team members report no Covid-19 symptoms and have all required PPE including face masks (to be worn when team members are within 6 feet of each other) and high visibility vests';

interface Props {
  navigation: {
    navigate: (page: string) => undefined;
  }
}

const DayStart = ({ navigation }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: DefaultRootState) => state.user);
  const [isAgreedSafety, setIsAgreedSafety] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [creekName, setCreekName] = useState<string>('');
  const [teamMembers, setTeamMembers] = useState<string[]>(['']);
  const [teamLead, setTeamLead] = useState<string>(user.displayName || '');

  useEffect(() => {
    setLoading(false);
    dispatch(getUser());
    dispatch(removeVisit())
  }, []);

  useEffect(() => {
    setTeamLead(user.displayName || '');
  }, [user]);


  const renderForm = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <View>
          <View>
            <AutoComplete
              label="Which creek are you surveying today?"
              creekName={creekName}
              setCreekName={setCreekName}
              list={creekList}
            />
          </View>
        </View>
        <Team
          teamLead={teamLead}
          setTeamLead={setTeamLead}
          teamMembers={teamMembers}
          setTeamMembers={setTeamMembers}
          displayName={user.displayName || ''}
        />
        <Liability
          statement={safetyAgreement}
          agreed={isAgreedSafety}
          setAgreed={setIsAgreedSafety}
        />
      </View>
    );
  }

  const initializeVisit = async () => {
    let sendMembers: string[] = teamMembers;
    if (user.displayName !== teamLead) {
      sendMembers = sendMembers.filter((member: string) => member !== teamLead)
      sendMembers.push(user.displayName || 'guest');
    }

    const result: any = await dispatch(initializeFieldVisit({creekName, teamLead, sendMembers}))
    console.log(result)
    if (result && !result.payload.error) {
      await setTeamMembers(['']);
      await setCreekName('');
      await setIsAgreedSafety(false);
      navigation.navigate('SpawnerProfile');
    } else {
      Alert.alert('Initializing visit was unsuccessful')
      setLoading(false);
    };
  };

  const dispatchVisit = () => {
    const members = teamMembers.filter((e) => e.replace(/(\r\n|\n|\r)/gm, ''));
    const creek = creekName.replace(/(\r\n|\n|\r)/gm, '');

    // This helps for debugging in the browser
    if (Platform.OS === 'web') {
      if (isAgreedSafety && teamLead && members.length && creek !== '') {
        setLoading(true);
        initializeVisit();
      } else if (!isAgreedSafety) alert('Please review the covid safety agreement');
      else if (!teamLead) alert('Please specify the team leader');
      else if (!members.length) alert('It is against SFEG policy to survey alone, please enter the name or initials of your fellow surveyors');
      else if (creek === '') alert('Please specify a creek name');
    } else {
    // Alert user if they haven't checked the covid safety agreement
      // eslint-disable-next-line no-lonely-if
      if (!isAgreedSafety) {
        Alert.alert(
          'Can\'t continue',
          'Please review the covid safety agreement',
          [{ text: 'OK' }],
        );
      } else if (!teamLead) {
      // Alert the user if they haven't specified a team lead
        Alert.alert(
          'Can\'t continue',
          'Please specify the team leader',
          [{ text: 'OK' }],
        );
      } else if (!members.length) {
      // Alert the user if they don't have any team members
        Alert.alert(
          'Can\'t continue',
          'It is against SFEG policy to survey alone, please enter the name or initials of your fellow surveyors',
          [{ text: 'OK' }],
        );
      } else if (!creek || creek === '') {
      // Alert the user if they haven't specified a creek name
        Alert.alert(
          'Can\'t continue',
          'Please specify a creek name',
          [{ text: 'OK' }],
        );
      } else {
        setLoading(true);
        initializeVisit();
      }
    }
  };

  const navigationHandler = (direction: string) => {
    if (direction === 'next') {
      dispatchVisit();
    } else {
      navigation.navigate('Profile');
    }
  };

  if (!user.uid) {
    return (<View>
      <Button onPress={() => navigation.navigate('SignIn')}>
        Sign In
      </Button>
    </View>)
  }

  return !loading ? (
    <SafeAreaView>
    <ScrollView
      style={{ margin: 20, marginTop: 100 }}
      keyboardShouldPersistTaps="always"
      nestedScrollEnabled={true}
    >
      <View style={{ alignContent: 'center' }}>
        <Title>
          {`Hello ${user?.displayName || 'surveyor'}`}
        </Title>
      </View>
      {renderForm()}
      <View style={{justifyContent: 'space-between'}}>
        <BackNext navigationHandler={navigationHandler} />
      </View>
    </ScrollView>
    </SafeAreaView>
  ) : (
    <View style={{ height: SIZES.height, justifyContent: 'center' }}>
      <ActivityIndicator
        size="large"
      />
    </View>
  );
}

export default DayStart;
