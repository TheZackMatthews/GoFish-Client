import { string } from 'prop-types';
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import {
  Checkbox,
  TextInput,
  Paragraph,
  Button,
  useTheme,
} from 'react-native-paper';
import { COLORS, SIZES } from '../../constants/Theme';

interface Props {
  teamLead: string,
  setTeamLead: React.Dispatch<React.SetStateAction<string>>,
  teamMembers: string[],
  setTeamMembers: React.Dispatch<React.SetStateAction<string[]>>,
  displayName: string,
}

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      light: string;
      medGreen: string,
    }
  }
}

const Team = ({
  teamLead,
  setTeamLead,
  teamMembers,
  setTeamMembers,
  displayName,
}: Props) => {
  const [isUserTeamLead, setIsUserTeamLead] = useState<boolean>(true);
  const theme: ReactNativePaper.Theme = useTheme();
  const toggleUserIsTeamLead = () => {
    setIsUserTeamLead(!isUserTeamLead);
    setTeamLead(
      teamLead === displayName ? '' : displayName,
    );
  };

  const renderTeamMemberInputs = () => {
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
                onPress={() => {setTeamLead(teamLead === member ? '' : member)}}
              />
            </View>
          )}
        </View>
      ))
    );
  }

  return (
    <>
    <View style={{
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-between'
    }}>
      <Paragraph> Are you the team lead? </Paragraph>
      <Checkbox
        status={isUserTeamLead ? 'checked' : 'unchecked'}
          onPress={() => {
            toggleUserIsTeamLead();
          }}
      />
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
            <Text style={{ color: COLORS.white }}>Add</Text>
          </Button>
          <Button
            style={{ margin: 10, width: SIZES.width / 3 }}
            color={theme.colors.light}
            icon="minus"
            mode="contained"
            disabled={teamMembers.length <= 1}
            onPress={() => setTeamMembers(teamMembers.splice(0, teamMembers.length - 1))}
          >
            <Text style={{ color: COLORS.white }}>Remove</Text>
          </Button>
        </View>
        {renderTeamMemberInputs()}
        </>
  )
}

export default Team
