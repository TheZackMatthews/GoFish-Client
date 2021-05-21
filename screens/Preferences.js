import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import {
  Title, Switch, Paragraph, Button,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFont } from '../redux/actions/themeActions';
import { prefStyles } from '../styles/AppStyles';

const Preferences = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const [switchOn, setSwitchOn] = useState(false);
  const onToggleSwitch = () => {
    setSwitchOn(!switchOn);
    dispatch(toggleFont());
  };

  useEffect(() => {
    if (theme === 'regular') setSwitchOn(false);
    else setSwitchOn(true);
  }, [theme]);

  return (
    <ScrollView style={prefStyles.container}>
      <Title style={prefStyles.title}>Preferences</Title>
      <View style={prefStyles.fontLarge}>
        <Paragraph>Large font view</Paragraph>
        <Switch value={switchOn} onValueChange={onToggleSwitch} />
      </View>
      <View>
        <Button
          style={prefStyles.button}
          mode="contained"
          onPress={() => navigation.navigate('Profile')}
        >
          Back
        </Button>
      </View>
    </ScrollView>
  );
};

Preferences.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Preferences.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default Preferences;
