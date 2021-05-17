import React, { useState } from 'react';
import { Button, View } from 'react-native';
import PropTypes from 'prop-types';
import { Title, TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';

function ModalCamera({
  modalVisible, setModalVisible, imageObject, setImageObject, savePhoto,
}) {
  const [comment, setComment] = useState('');
  const list = [
    { label: 'I need help identifying this fish.', value: 'help identifying' },
    { label: 'This is an outreach photo.', value: 'outreach' },
    { label: 'Other reason.', value: 'other' },
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(list);

  const toggleModal = async () => {
    await savePhoto({
      ...imageObject,
      comment,
      category: value,
    });
    setModalVisible(!modalVisible);
  };

  return (
    <Modal
      backdropOpacity={0.8}
      isVisible={modalVisible}
    >
      <View style={{
        flex: 1,
        backgroundColor: '#f4f4f4',
        justifyContent: 'space-between',
        padding: 15,
      }}
      >
        <View>
          <Title>Tell us more about this photo.</Title>
          <DropDownPicker
            searchable={false}
            placeholder="Photo category"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
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
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
        </View>
        <Button title="Save" onPress={toggleModal} />
      </View>
    </Modal>

  );
}

ModalCamera.propTypes = {
  modalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  imageObject: PropTypes.shape({
    uri: PropTypes.string,
    comment: PropTypes.string,
    category: PropTypes.string,
  }),
  setImageObject: PropTypes.func,
  savePhoto: PropTypes.func,
};

ModalCamera.defaultProps = {
  modalVisible: false,
  setModalVisible: () => null,
  imageObject: {
    uri: '',
    comment: '',
    category: '',
  },
  setImageObject: () => null,
  savePhoto: () => null,
};

export default ModalCamera;
