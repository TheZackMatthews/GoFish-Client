import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
import { updatePin } from '../../redux/actions/surveyActions';

const DropDown = ({ question }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(question.answers);
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pin);

  const changeHandler = (val) => {
    dispatch(updatePin({
      ...pin,
      [question.data]: val,
    }));
  };

  return (
    items ? (
      <View style={{ height: 175, justifyContent: 'space-between' }}>
        <DropDownPicker
          searchable={false}
          placeholder={question.label}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={(val) => changeHandler(val)}
          style={{
            borderWidth: 0,
            backgroundColor: '#f4f4f4',
            marginVertical: 10,
          }}
          dropDownContainerStyle={{
            borderWidth: 0,
            height: 125,
          }}
        />
        <Button mode="outlined">Unable to identify</Button>
      </View>
    ) : (<Text>Loading...</Text>)
  );
};

DropDown.propTypes = {
  question: PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.shape(
      {
        value: PropTypes.string,
        label: PropTypes.string,
      },
    )),
  }),
};

DropDown.defaultProps = {
  question: {
    label: '',
    type: '',
    data: '',
    answers: [
      {
        value: '',
        label: '',
      },
    ],
  },
};

export default DropDown;
