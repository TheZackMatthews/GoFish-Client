import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { styles } from '../styles/FormsStyles';
import { FONTS } from '../constants/theme';
import { profilePic } from '../images';

const EditUserInfo = ({ title }) => (
  <View style={styles.headContainer}>
    <Avatar.Image size={100} source={profilePic} />
    <Text />
    <View style={styles.infoText}>
      <Text style={styles.secondHeader}>Contact Information</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.infoTextCategory}>Phone Number:</Text>
        <Text style={styles.infoText}>333-333-3333</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.infoTextCategory}>Email:</Text>
        <Text style={styles.infoText}>{title.email}</Text>
      </View>
    </View>
    <Text style={{ ...FONTS.h1 }}>Would you like large font?</Text>
    <View style={{ flexDirection: 'row' }}>
      <Button mode="contained" style={{ marginTop: 30 }} onPress={() => console.log('Pressed')}>Yes</Button>

      <Button mode="contained" style={{ marginTop: 30 }} onPress={() => console.log('Pressed')}>No</Button>
    </View>
    {' '}

  </View>
);

EditUserInfo.propTypes = {
  title: PropTypes.string,
};

EditUserInfo.defaultProps = {
  title: '',
};

export default EditUserInfo;
