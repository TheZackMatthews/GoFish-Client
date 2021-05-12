import React, { useState, useEffect } from 'react';
import {
  Platform, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import {
  Checkbox, Button, Switch, TextInput,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../styles/FormsStyles';
import { styles as tempStyles } from '../styles/UserStyles'; // FIXME We should only have one stylesheet
import { logOutUser, getUser } from '../redux/actions/userActions';
import { COLORS, SIZES, FONTS } from '../constants/theme';

// TODO
// Set errorM when there is no user
// Add navigation buttons

function DayStart({ navigation }) {
  const [errorM, setErrorM] = useState('');
  const [teamMembers, setTeamMembers] = useState(['']);
  const [isTeamLead, setIsTeamLead] = React.useState(true);
  const [isAgreedSafety, setIsAgreedSafety] = React.useState(true);

  const dispatch = useDispatch();
  const toggleIsTeamLead = () => setIsTeamLead(!isTeamLead);
  const toggleIsAgreedSafety = () => setIsAgreedSafety(!isAgreedSafety);

  // Get the user object
  const user = useSelector((state) => state.user);
  // console.log(user); // TODO Remove console statement
  useEffect(() => {
    if (!user) dispatch(getUser());
  }, []);

  function renderTeamMemberInputs() {
    return (
      teamMembers.map((member, index) => (
        <TextInput
          // NOTE If any super weird bugs occur, this is it
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onChangeText={(text) => {
            const temp = teamMembers.slice();
            temp.splice(index, 1, text);
            setTeamMembers(temp);
          }}
          value={teamMembers[index]}
          label="Surveyer first name"
        />
      ))
    );
  }

  function renderForm() {
    return (
      <View style={styles.outsideView}>
        <Text> Are you the team lead today? </Text>
        <Checkbox
          status={isTeamLead ? 'checked' : 'unchecked'}
          onPress={() => toggleIsTeamLead()}
        />
        {/* <View style={styles.view}>
          <Switch value={teamLead} onValueChange={onToggleSwitch} />
        </View> */}

        <Text> Who is surveying with you? </Text>
        <View style={tempStyles.buttons}>
          <Button
            icon="plus"
            color={COLORS.green}
            mode="contained"
            onPress={() => setTeamMembers(teamMembers.concat(['']))}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Add Team Member</Text>
          </Button>
          <Button
            icon="minus"
            color={COLORS.green}
            mode="contained"
            disabled={teamMembers.length <= 1}
            onPress={() => setTeamMembers(teamMembers.splice(0, teamMembers.length - 1))}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Remove Team Member</Text>
          </Button>
        </View>
        {renderTeamMemberInputs()}

        <Text style={{ marginTop: '2em' }}> __Covid safety agreement here__ </Text>

        <View>
          <Checkbox
            status={isAgreedSafety ? 'checked' : 'unchecked'}
            onPress={() => toggleIsAgreedSafety()}
          />
        </View>
      </View>
    );
  }

  function renderNavigationButton(key, callback) {
    return (
      <View style={{ margin: SIZES.padding * 2, alignItems: key === 'Back' ? 'flex-start' : 'flex-end' }}>
        <TouchableOpacity
          style={{
            height: 10,
            backgroundColor: COLORS.green,
            borderRadius: SIZES.radius,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',

          }}
          onPress={callback}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{key}</Text>
        </TouchableOpacity>
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
    console.log('pressed')
  };

  return user ? (
    <View>
      <Text>
        { `Hello ${user.displayName}` }
      </Text>
      {/* TODO delete this */}
      {renderForm()}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {renderNavigationButton('Back', dispatchLogOut)}
        {renderNavigationButton('Next', dispatchVolunteers)}
      </View>
    </View>
  ) : (
    <View>{!!errorM && <Text>{errorM}</Text>}</View>
  );
}
// TODO navigation.navigate('Profile')

export default DayStart;
