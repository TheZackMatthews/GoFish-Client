import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import { useSelector, useDispatch } from 'react-redux';
import { updatePin } from '../../redux/actions/surveyActions';
import { IQuestion, IAnswer } from '../../interfaces/flow';
import { DefaultRootState } from '../../interfaces/state';

interface Props {
  question: IQuestion,
  setAnswer: React.Dispatch<React.SetStateAction<IAnswer | undefined>>,
  validate: (i: number) => void,
  i: number,
}

const DropDown = ({ question, setAnswer, validate, i }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<IAnswer[] | undefined>(question.answers);
  const [value, setValue] = useState<ValueType | null | ValueType[]>(null);
  const dispatch = useDispatch();
  const pin = useSelector((state: DefaultRootState) => state.pin);

  const changeHandler = (val: ValueType | null | ValueType[]) => {
    validate(i);
    setValue(val);
    if (question.data) {
      dispatch(updatePin({
        ...pin,
        [question.data]: val,
      }));
    }
    if (setAnswer !== undefined) {
      const answer = question.answers?.find((one) => {
        return one.value === val;
      })
      setAnswer(answer);
    }
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
          setItems={() => setItems}
          onChangeValue={(val: ValueType | null | ValueType[]) => changeHandler(val)}
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
  setAnswer: PropTypes.func,
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
  setAnswer: () => null,
};

export default DropDown;
