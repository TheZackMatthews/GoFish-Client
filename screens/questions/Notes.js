import React, { useState } from 'react';
import { View } from 'react-native';
import { Title, TextInput, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { completePin, removePin } from '../../redux/actions/surveyActions';
import BackNext from '../../components/questions/BackNext';
import styles from '../../styles/QuestionStyles';
import AccessCamera from '../../components/camera/AccessCamera';

const Notes = ({ navigation }) => {
  const [comments, setComments] = useState('');
  const theme = useTheme();
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pin);

  const navigationHandler = async (direction) => {
    if (direction === 'back') {
      navigation.navigate('FishAlive1');
    } else if (direction === 'next') {
      await dispatch(completePin({
        ...pin,
        comments,
      }));
      await dispatch(removePin());
      await setComments('');
      navigation.navigate('SpawnerProfile');
    }
  };
  const cameraNav = () => {
    navigation.navigate('Camera');
  };
  return (
    <View style={styles.container}>
      <View style={styles.notesContainer}>
        <Title>Notes</Title>
        <View style={{
          backgroundColor: '#f4f4f4',
          borderColor: theme.colors.light,
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
      <AccessCamera navigationHandler={cameraNav} />
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
