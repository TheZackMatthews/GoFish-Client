import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Title, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { updatePin, getPin } from '../../redux/actions/storageActions';
import BackNext from '../../components/questions/BackNext';
import styles from '../../styles/QuestionStyles';
import { COLORS } from '../../constants/theme';

const Notes = ({ navigation }) => {
  const [comments, setComments] = useState('');
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pin);
  console.log(pin);

  // useEffect(() => {
  //   if (Object.keys(pin).length < 3) {
  //     dispatch(getPin());
  //   }
  // }, []);
  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('FishAlive1');
    } else if (direction === 'next') {
      await dispatch(updatePin({
        ...pin,
        comments,
      }));
      // THEN > update field visit with pin info
      // do we need a way to change the value of the key for the
      // storage based on how many exist? or will we
      // assign them to the field trip and restart each time?
      await setComments('');
      navigation.navigate('Profile');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.notesContainer}>
        <Title>Notes</Title>
        <View style={{
          backgroundColor: '#f4f4f4',
          borderColor: COLORS.blue,
          borderWidth: 2,
        }}
        >
          <TextInput
            value={comments}
            multiline
            numberOfLines={12}
            onChangeText={(text) => setComments(text)}
          />
        </View>
      </View>
      <BackNext navigationHandler={(direction) => navigationHandler(direction)} />
    </View>
  );
};

Notes.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Notes.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default Notes;
