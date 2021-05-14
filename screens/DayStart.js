import React, { useState, useEffect } from 'react';
import {
  Platform, Alert, Text, View,
} from 'react-native';
import {
  Checkbox, Button, TextInput, Title, Paragraph,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import tempStyles from '../styles/UserStyles'; // FIXME We should only have one stylesheet
import { logOutUser, getUser } from '../redux/actions/userActions';
import { initializeFieldVisit } from '../redux/actions/surveyActions';
import { COLORS, SIZES } from '../constants/theme';
import BackNext from '../components/questions/BackNext';

const safetyAgreement = 'I certify that all team members report no Covid-19 symptoms and have all required PPE including face masks (to be worn when team members are within 6 feet of each other) and high visibility vests';

// TODO: We should probably prevent them from continuing if dispatch(initializeFieldVisit) fails

function DayStart({ navigation }) {
  const dispatch = useDispatch();
  // Get the user object
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user) dispatch(getUser());
  }, []);

  const [errorM, setErrorM] = useState('');
  const [teamMembers, setTeamMembers] = useState(['']);
  const [teamLead, setTeamLead] = useState(user.displayName);
  const [isUserTeamLead, setIsUserTeamLead] = useState(true);
  const [creekName, setCreekName] = useState('');
  const [isAgreedSafety, setIsAgreedSafety] = useState(false);

  const toggleUserIsTeamLead = () => {
    setIsUserTeamLead(!isUserTeamLead);
    setTeamLead(
      teamLead === user.displayName ? null : user.displayName,
    );
  };
  const toggleIsAgreedSafety = () => setIsAgreedSafety(!isAgreedSafety);

  function renderTeamMemberInputs() {
    return (
      teamMembers.map((member, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={index}>
          <TextInput
            key={String.fromCharCode(index + 1)}
            mode="outlined"
            onChangeText={(text) => {
              const temp = teamMembers.slice();
              temp.splice(index, 1, text);
              setTeamMembers(temp);
            }}
            value={teamMembers[index]}
            label="Surveyer first name"
          />
          {isUserTeamLead ? null : (
            <View>
              <Text>
                {`Is ${member} the team lead?`}
              </Text>
              <Checkbox
                key={String.fromCharCode((index + 1) * -1)}
                status={teamLead === member ? 'checked' : 'unchecked'}
                onPress={() => { (teamLead === member) ? setTeamLead(null) : setTeamLead(member); }}
              />
            </View>
          )}
        </View>
      ))
    );
  }

  function renderForm() {
    return (
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between' }}>
          <Paragraph> Are you the team lead today? </Paragraph>
          <Checkbox
            status={isUserTeamLead ? 'checked' : 'unchecked'}
            onPress={() => {
              toggleUserIsTeamLead();
              console.log(teamLead);
            }}
          />

        </View>

        <View>
          <Text>
            Which creek are you surveying today?
          </Text>
          <TextInput
            mode="outlined"
            onChangeText={(text) => {
              setCreekName(text);
            }}
            value={creekName}
            label="Creek name"
          />
        </View>

        <Paragraph> Who is surveying with you? </Paragraph>
        <View style={{ flexDirection: 'row' }}>
          <Button
            style={{ margin: 10, width: SIZES.width / 3 }}
            icon="plus"
            color={COLORS.blue}
            mode="contained"
            onPress={() => setTeamMembers(teamMembers.concat(['']))}
          >
            <Text fontWeight="600" style={{ color: COLORS.white }}>Add</Text>
          </Button>
          <Button
            style={{ margin: 10, width: SIZES.width / 3 }}
            icon="minus"
            color={COLORS.blue}
            mode="contained"
            disabled={teamMembers.length <= 1}
            onPress={() => setTeamMembers(teamMembers.splice(0, teamMembers.length - 1))}
          >
            <Text fontWeight="600" style={{ color: COLORS.white }}>Remove</Text>
          </Button>
        </View>
        {renderTeamMemberInputs()}

        <Paragraph style={{ marginTop: 15 }}>
          {safetyAgreement}
        </Paragraph>
        <View style={{
          flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', paddingTop: 10, paddingBottom: 10,
        }}
        >
          <Paragraph> I agree </Paragraph>
          <Checkbox
            status={isAgreedSafety ? 'checked' : 'unchecked'}
            onPress={() => toggleIsAgreedSafety()}
          />
        </View>
      </View>
    );
  }

  const dispatchLogOut = async () => {
    setErrorM('');
    const result = await dispatch(logOutUser(setErrorM));
    console.log(result);
    if (result && result.payload) {
      navigation.navigate('SignIn');
    }
  };

  const dispatchVolunteers = async () => {
    setErrorM('');
    const members = teamMembers.filter((e) => e.replace(/(\r\n|\n|\r)/gm, ''));
    const creek = creekName.replace(/(\r\n|\n|\r)/gm, '');

    if (Platform.OS === 'web') {
      if (isAgreedSafety && teamLead && members.length && creek !== '') {
        await dispatch(initializeFieldVisit(creekName, teamLead, teamMembers));
        navigation.navigate('SpawnerProfile');
      } else if (!isAgreedSafety) console.log('Please review the covid safety agreement');
      else if (!teamLead) console.log('Please specify the team leader');
      else if (!members.length) console.log('It is against SFEG policy to survey alone, please enter the name or initials of your fellow surveyors');
      else if (creek === '') console.log('Please specify a creek name');
    }
    // Alert user if they haven't checked the covid safety agreement
    if (!isAgreedSafety) {
      Alert.alert(
        'Can\'t continue',
        'Please review the covid safety agreement',
        [
          {
            text: 'Log out',
            onPress: dispatchLogOut,
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
      );
    } else if (!teamLead) {
      // Alert the user if they haven't specified a team lead
      Alert.alert(
        'Can\'t continue',
        'Please specify the team leader',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
      );
    } else if (!members.length) {
      // Alert the user if they don't have any team members
      Alert.alert(
        'Can\'t continue',
        'It is against SFEG policy to survey alone, please enter the name or initials of your fellow surveyors',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
      );
    } else if (!creek || creek === '') {
      // Alert the user if they haven't specified a creek name
      Alert.alert(
        'Can\'t continue',
        'Please specify a creek name',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
      );
    } else {
      await dispatch(initializeFieldVisit(creekName, teamLead, teamMembers));
      navigation.navigate('SpawnerProfile');
    }
  };

  const navigationHandler = (direction) => {
    if (direction === 'next') {
      dispatchVolunteers();
    } else {
      dispatchLogOut();
    }
  };

  return user ? (
    <View style={{ margin: 40, marginTop: 100 }}>
      <View style={{ alignContent: 'center' }}>
        <Title>
          {`Hello ${user?.displayName || 'surveyor'}`}
        </Title>
      </View>
      {renderForm()}
      <View styles={tempStyles.buttons}>
        <BackNext navigationHandler={navigationHandler} />
      </View>
    </View>
  ) : (
    <View>{!!errorM && <Text>{errorM}</Text>}</View>
  );
}

DayStart.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

DayStart.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default DayStart;
