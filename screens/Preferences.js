import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Title, Switch, Paragraph, Button,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFont } from '../redux/actions/themeActions';
import { SIZES } from '../constants/theme';

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  title: {
    alignSelf: 'center',
  },
  fontLarge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    width: SIZES.width / 2,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

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
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Preferences</Title>
      <View style={styles.fontLarge}>
        <Paragraph>Large font view</Paragraph>
        <Switch value={switchOn} onValueChange={onToggleSwitch} />
      </View>
      <View>
        <Button
          style={styles.button}
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
