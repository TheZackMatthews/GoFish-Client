import React, { useState, useEffect } from 'react';
import {
  Alert, Modal, StyleSheet, Text, Pressable, View,
} from 'react-native';

const LocationModal = (props) => {
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
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => submitLocation()}>
              {toggleText}
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                // setModalVisible(!modalVisible);
                dropPin(true);
              }}
            >
              <Text style={styles.textStyle}>Drop Pin</Text>
            </Pressable>
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
    backgroundColor: '#ffe6f2',
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
    borderRadius: 7,
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#b3ccff',
  },
  buttonClose: {
    backgroundColor: '#a3a3c2',
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
