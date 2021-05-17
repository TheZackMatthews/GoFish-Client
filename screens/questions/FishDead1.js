import React, { useState } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { updatePin } from '../../redux/actions/surveyActions';
import BackNext from '../../components/questions/BackNext';
import styles from '../../styles/QuestionStyles';
import OneAnswer from '../../components/questions/OneAnswer';
import { SIZES } from '../../constants/theme';

const FishDead1 = ({ navigation }) => {
  const pin = useSelector((state) => state.pin);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ species: '', total: 0 });
  const question = 'What species?';

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('Fish1');
    } else if (form.species !== '' && form.total !== 0) {
      await dispatch(updatePin({
        ...pin,
        fish_species: form.species,
        fish_count: form.total,
      }));
      navigation.navigate('FishDead2');
    } else {
      Alert.alert('Please choose an option!');
    }
  };
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Button
        style={{ width: SIZES.width / 2, alignSelf: 'center' }}
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

FishDead1.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

FishDead1.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default FishDead1;
