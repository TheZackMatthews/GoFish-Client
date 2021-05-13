import React, { useState } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import BackNext from '../../components/questions/BackNext';
import styles from '../../styles/QuestionStyles';
import OneAnswer from '../../components/questions/OneAnswer';

const FishAlive1 = ({ navigation }) => {
  const [form, setForm] = useState({ species: '', total: 0 });
  const question = 'What species is the fish?';

  const referenceInfo = () => {
    navigation.navigate('ReferenceInfo');
  };

  const navigationHandler = (direction) => {
    if (direction === 'back') {
      navigation.navigate('Fish1');
    } else if (form.species !== '' && form.total !== 0) {
      navigation.navigate('FishAlive2');
    } else {
      Alert.alert(
        'Wait!',
        'Please choose an option!',
        [
          {
            text: 'Okay',
            onPress: () => console.log('cancel'),
            style: 'cancel',
          },
        ],
      );
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('ReferenceInfo')}
      >
        Unable to ID
      </Button>
      <OneAnswer
        question={question}
        form={form}
        setForm={setForm}
      />
      <BackNext navigationHandler={(direction) => navigationHandler(direction)} />
    </KeyboardAvoidingView>
  );
};

FishAlive1.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

FishAlive1.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default FishAlive1;
