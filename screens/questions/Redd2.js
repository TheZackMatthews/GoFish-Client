import React, { useState } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import { updatePin } from '../../redux/actions/storageActions';
import BackNext from '../../components/questions/BackNext';
import styles from '../../styles/QuestionStyles';
import OneAnswer from '../../components/questions/OneAnswer';

const Redd2 = ({ navigation }) => {
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pin);
  const [form, setForm] = useState({ species: '', total: 0 });
  const question = 'What species?';

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('Redd1');
    } else if (form.species !== '' && form.total !== 0) {
      await dispatch(updatePin({
        ...pin,
        fish_species: form.species,
        fish_count: form.total,
      }));
      navigation.navigate('Notes');
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

Redd2.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Redd2.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default Redd2;
