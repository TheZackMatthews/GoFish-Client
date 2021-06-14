import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { IQuestion } from '../../interfaces/flow';

interface Props {
  question: string,
  form: any,
  setForm: React.Dispatch<React.SetStateAction<any>>
}

const OneAnswer = ({
  question, form, setForm,
}: Props) => {
  const list = [
    { label: 'Chinook', value: 'chinook' },
    { label: 'Coho', value: 'coho' },
    { label: 'Sockeye', value: 'sockeye' },
    { label: 'Pink', value: 'pink' },
    { label: 'Chum', value: 'chum' },
    { label: 'Trout', value: 'trout' },
  ];
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<any>(null);
  const [items, setItems] = useState<any>(list);

  useEffect(() => {
    setForm({ ...form, species: value });
  }, [value]);

  return (
    <View>
      <DropDownPicker
        searchable={false}
        placeholder={question}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={() => setValue}
        setItems={() => setItems}
        style={{
          borderWidth: 0,
          backgroundColor: '#f4f4f4',
          marginVertical: 10,
        }}
        dropDownContainerStyle={{
          borderWidth: 0,
        }}
      />
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
