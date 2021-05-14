import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Title, List } from 'react-native-paper';
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import {
  references, coho, chinook, pink, sockeye, chum,
} from '../../images';
import styles from '../../styles/QuestionStyles';

const FishDead2 = ({ navigation }) => {
  const fish = (useSelector((state) => state.pin.fish_species));
  const [fork, setFork] = useState(null);
  const [fin, setFin] = useState(null);
  const [gender, setGender] = useState(null);
  const [spawn, setSpawn] = useState(null);
  console.log(fish);
  let image;
  switch (fish) {
    case 'coho':
      image = [coho.cohoFemale, coho.cohoMale];
      break;
    case 'chinook':
      image = [coho.cohoFemale, coho.cohoMale];
      break;
    case 'pink':
      image = [coho.cohoFemale, coho.cohoMale];
      break;
    case 'sockeye':
      image = [coho.cohoFemale, coho.cohoMale];
      break;
    case 'chum':
      image = [coho.cohoFemale, coho.cohoMale];
      break;
    default:
      image = '';
      break;
  }

  const navigationHandler = (direction) => {
    if (direction === 'back') {
      navigation.navigate('FishDead1');
    } else if (fork && fin && gender && spawn) {
      navigation.navigate('Notes');
    } else {
      Alert.alert('Please answer all the questions!');
    }
  };
  return (
    <View style={styles.container}>
      <Title>Extended Data</Title>
      <TwoAnswer
        image={[references.forkLength]}
        question="What is the fork length?"
        answer1="Yes"
        answer2="No"
        choose={setFork}
      />
      <TwoAnswer
        image={[references.adiposeFin]}
        question="Does it have an adipose fin?"
        answer1="Yes"
        answer2="No"
        choose={setFin}
      />
      <TwoAnswer
        question="Did it successfully spawn?"
        answer1="Yes"
        answer2="No"
        choose={setSpawn}
      />
      {image && (
      <TwoAnswer
        image={image}
        question="What gender is it?"
        answer1="Male"
        answer2="Female"
        choose={setGender}
      />
      )}

      <BackNext navigationHandler={(direction) => navigationHandler(direction)} />

    </View>
  );
};

FishDead2.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

FishDead2.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default FishDead2;
