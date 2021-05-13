import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles/FormStyles';

function renderButton({ title }) {
  return (
    <View style={styles.buttonMain}>
      <TouchableOpacity>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default renderButton;
