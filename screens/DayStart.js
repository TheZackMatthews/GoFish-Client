import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity, ScrollView, Platform, Alert, Text, View,
} from 'react-native';
import {
  Checkbox,
  Button,
  TextInput,
  Title,
  Paragraph,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';
import style from '../styles/DayStartStyles';
import { logOutUser, getUser } from '../redux/actions/userActions';
import { initializeFieldVisit } from '../redux/actions/surveyActions';
import { COLORS, SIZES } from '../constants/theme';
import BackNext from '../components/questions/BackNext';

import { creekList } from '../assets/creeknames.json';

const safetyAgreement = 'I certify that all team members report no Covid-19 symptoms and have all required PPE including face masks (to be worn when team members are within 6 feet of each other) and high visibility vests';

// TODO: We should probably prevent them from continuing if dispatch(initializeFieldVisit) fails

function DayStart({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  // Get the user object
  const user = useSelector((state) => state.user);

  const [teamMembers, setTeamMembers] = useState(['']);
  const [teamLead, setTeamLead] = useState(user.displayName);
  const [isUserTeamLead, setIsUserTeamLead] = useState(true);
  const [creekName, setCreekName] = useState('');
  const [isAgreedSafety, setIsAgreedSafety] = useState(false);
  const [query, setQuery] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, []);
  useEffect(() => {
    setTeamLead(user.displayName);
  }, [user]);

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
                onPress={() => { setTeamLead((teamLead === member) ? null : member); }}
              />
            </View>
          )}
        </View>
      ))
    );
  }

  const SearchDataFromJSON = (input) => {
    // TODO if input exactly matches an item in creeksList, set it to the creekName
    if (input) {
      // Making the Search as Case Insensitive.
      const regex = new RegExp(`${input.trim()}`, 'i');
      setFilterData(
        creekList.filter((data) => data.search(regex) >= 0),
      );
    } else {
      setFilterData([]);
    }
  };

  function renderForm() {
    return (
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between' }}>
          <Paragraph> Are you the team lead today? </Paragraph>
          <Checkbox
            status={isUserTeamLead ? 'checked' : 'unchecked'}
            onPress={() => {
              toggleUserIsTeamLead();
            }}
          />

        </View>

        <View>
          <Text>
            Which creek are you surveying today?
          </Text>
          <View>
            <Autocomplete
              data={filterData}
              value={query}
              autoCorrect
              hideResults={false}
              onChangeText={(text) => {
                SearchDataFromJSON(text);
                setQuery(text);
              }}
              // inputContainerStyle={
                // (creekName !== '') ?
                // style.SearchBoxCompleted : style.SearchBoxUncomplete}
              listContainerStyle={style.SearchBox}
              // listStyle={style.SearchBox}
              flatListProps={{
                keyExtractor: (item) => item,
                // eslint-disable-next-line react/prop-types
                renderItem: ({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setQuery(item);
                      setCreekName(item);
                      setFilterData([]);
                    }}
                  >
                    <Text style={style.SearchBoxTextItem}>{item}</Text>
                  </TouchableOpacity>
                ),
              }}
            />
          </View>
        </View>

        <Paragraph> Who is surveying with you? </Paragraph>
        <View style={{ flexDirection: 'row' }}>
          <Button
            style={{ margin: 10, width: SIZES.width / 3 }}
            color={theme.colors.light}
            icon="plus"
            mode="contained"
            onPress={() => setTeamMembers(teamMembers.concat(['']))}
          >
            <Text fontWeight="600" style={{ color: COLORS.white }}>Add</Text>
          </Button>
          <Button
            style={{ margin: 10, width: SIZES.width / 3 }}
            color={theme.colors.light}
            icon="minus"
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
    const result = await dispatch(logOutUser());
    if (result && result.payload) {
      navigation.navigate('Profile');
    }
  };

  const initializeVisit = async () => {
    const result = await dispatch(initializeFieldVisit(creekName, teamLead, teamMembers));
    if (result.payload) {
      await setQuery('');
      await setFilterData([]);
      await setTeamMembers(['']);
      await setCreekName('');
      await setIsAgreedSafety(false);
      navigation.navigate('SpawnerProfile');
    } else console.log(result);
  };

  const dispatchVolunteers = () => {
    const members = teamMembers.filter((e) => e.replace(/(\r\n|\n|\r)/gm, ''));
    const creek = creekName.replace(/(\r\n|\n|\r)/gm, '');

    // Corrects a bug where displayName is undefined on load
    if (!teamLead && user.displayName && isUserTeamLead) setTeamLead(user.displayName);

    // This helps for debugging in the browser
    if (Platform.OS === 'web') {
      if (isAgreedSafety && teamLead && members.length && creek !== '') {
        setLoading(true);
        initializeVisit();
      } else if (!isAgreedSafety) console.log('Please review the covid safety agreement');
      else if (!teamLead) console.log('Please specify the team leader');
      else if (!members.length) console.log('It is against SFEG policy to survey alone, please enter the name or initials of your fellow surveyors');
      else if (creek === '') console.log('Please specify a creek name');
    } else {
    // Alert user if they haven't checked the covid safety agreement
      // eslint-disable-next-line no-lonely-if
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
        setLoading(true);
        initializeVisit();
      }
    }
  };

  const navigationHandler = (direction) => {
    if (direction === 'next') {
      dispatchVolunteers();
    } else {
      dispatchLogOut();
    }
  };

  return user && !loading ? (
    <ScrollView
      style={{ margin: 40, marginTop: 100 }}
      keyboardShouldPersistTaps="always"
      nestedscrollenabled="{true}"
    >
      <View style={{ alignContent: 'center' }}>
        <Title>
          {`Hello ${user?.displayName || 'surveyor'}`}
        </Title>
      </View>
      {renderForm()}
      <View styles={style.buttons}>
        <BackNext navigationHandler={navigationHandler} />
      </View>
    </ScrollView>
  ) : (
    <View style={{ height: SIZES.height, justifyContent: 'center' }}>
      <ActivityIndicator
        size="large"
        loading={loading}
      />
    </View>
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
