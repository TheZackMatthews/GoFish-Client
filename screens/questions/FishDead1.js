import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import BackNext from '../../components/questions/BackNext';
import styles from '../../styles/QuestionStyles';
import OneAnswer from '../../components/questions/OneAnswer';

const FishDead1 = ({ navigation }) => {
  const [form, setForm] = useState({ spicie: '', total: 0 });
  const question = 'What spicies?';
  console.log(form);

  const navigationHandler = (direction) => {
    if (direction === 'back') {
      navigation.navigate('Fish1');
    } else if (form !== { spicie: '', total: 0 }) {
      navigation.navigate('FishDead2');
    } else {
      alert('Please choose an option!');
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
