import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { List, TextInput } from 'react-native-paper';

const OneAnswer = ({
  question, form, setForm,
}) => {
  const pressHandler = (answer) => {
    setForm({ ...form, species: answer });
  };

  return (
    <View>
      <List.Accordion title={question}>
        <List.Item onPress={() => pressHandler('Chinook')} title="Chinook" left={() => <List.Icon icon="fish" />} />
        <List.Item onPress={() => pressHandler('Coho')} title="Coho" left={() => <List.Icon icon="fish" />} />
        <List.Item onPress={() => pressHandler('Sockeye')} title="Sockeye" left={() => <List.Icon icon="fish" />} />
        <List.Item onPress={() => pressHandler('Pink')} title="Pink" left={() => <List.Icon icon="fish" />} />
        <List.Item onPress={() => pressHandler('Chum')} title="Chum" left={() => <List.Icon icon="fish" />} />
        <List.Item onPress={() => pressHandler('Unknown')} title="Unknown" left={() => <List.Icon icon="fish" />} />
      </List.Accordion>
      <TextInput
        value={form.total.toString()}
        keyboardType="numeric"
        onChangeText={(number) => setForm({ ...form, total: +number })}
      />

    </View>
  );
};

OneAnswer.propTypes = {
  question: PropTypes.string,
  form: PropTypes.shape({
    species: PropTypes.string,
    total: PropTypes.number,
  }),
  setForm: PropTypes.func,
};

OneAnswer.defaultProps = {
  question: '',
  form: { species: '', total: 0 },
  setForm: () => null,
};

export default OneAnswer;