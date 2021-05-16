import React, { useState } from 'react';
import { Button, View } from 'react-native';
import PropTypes from 'prop-types';
import { DataTable, Title, TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { updateFieldVisit } from '../redux/actions/surveyActions';

function ModalConditions({
  text, modalVisible, setModalVisible, data, label, update,
}) {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const visit = useSelector((state) => state.visit);

  const toggleModal = async () => {
    const updateVisit = {
      ...visit,
      [update]: value,
    };
    await setValue('');
    await dispatch(updateFieldVisit(updateVisit));
    setModalVisible(!modalVisible);
  };

  const renderCells = () => data.map((item) => (
    <DataTable.Row key={item.id}>
      <DataTable.Cell>{item.detail}</DataTable.Cell>
      <DataTable.Cell numeric>{item.id}</DataTable.Cell>
    </DataTable.Row>
  ));

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
          <Title>{text}</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Description</DataTable.Title>
              <DataTable.Title numeric>Rating</DataTable.Title>
            </DataTable.Header>
            {renderCells()}
          </DataTable>
          <TextInput
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            label={label}
          />
        </View>
        <Button title="Save" onPress={toggleModal} />
      </View>
    </Modal>

  );
}

ModalConditions.propTypes = {
  text: PropTypes.string,
  modalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    detail: PropTypes.string,
  })),
  label: PropTypes.string,
  update: PropTypes.string,
};

ModalConditions.defaultProps = {
  text: '',
  modalVisible: false,
  setModalVisible: () => false,
  data: [
    {
      id: 1,
      detail: '',
    },
  ],
  label: '',
  update: '',
};

export default ModalConditions;
