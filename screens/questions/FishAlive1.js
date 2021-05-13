import React, { useState } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { updatePin } from '../../redux/actions/storageActions';
import BackNext from '../../components/questions/BackNext';
import styles from '../../styles/QuestionStyles';
import OneAnswer from '../../components/questions/OneAnswer';

const FishAlive1 = ({ navigation }) => {
  const [form, setForm] = useState({ species: '', total: 0 });
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pin);
  const question = 'What species is the fish?';

  // eslint-disable-next-line no-unused-vars
  const referenceInfo = () => {
    navigation.navigate('ReferenceInfo');
  };
  console.log(form)
  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('Fish1');
    } else if (form.species !== '' && form.total !== 0) {
      dispatch(updatePin({
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