import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import {
  Alert, Modal, StyleSheet, Text, Pressable, View,
} from 'react-native';
import { COLORS } from '../../constants/Theme';

interface Props {
  commands: {
    visible: boolean,
    pinDropped: boolean,
  },
  dropPin: any,
  submitLocation: any,
}
const LocationModal = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    commands: { visible, pinDropped },
    dropPin,
    submitLocation,
  } = props;

  useEffect(() => {
    if (visible !== modalVisible) setModalVisible(visible);
  }, [props]);

  let toggleText;
  if (!pinDropped) toggleText = <Text style={styles.textStyle}>Use Current Location</Text>;
  else toggleText = <Text style={styles.textStyle}>Use Pin Location</Text>;

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button style={[styles.button]} onPress={() => submitLocation()}>
              {toggleText}
            </Button>
            <Button
              style={[styles.button]}
              onPress={() => {
                // setModalVisible(!modalVisible);
                dropPin(true);
              }}
            >
              <Text style={styles.textStyle}>Drop Pin</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 3,
    padding: 0,
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: COLORS.blue,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: COLORS.lightGreen,
  },
  buttonClose: {
    backgroundColor: COLORS.lightGreen,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default LocationModal;
