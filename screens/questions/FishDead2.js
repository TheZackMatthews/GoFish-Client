import React, { useState } from 'react';
import {
  View, ScrollView, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Title, List, Card, TextInput } from 'react-native-paper';
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import styles from '../../styles/QuestionStyles';

const FishDead2 = ({ navigation }) => {
  const fish = (useSelector((state) => state.pin.fish_species));
  const [fork, setFork] = useState(null);
  const [fin, setFin] = useState(null);
  const [gender, setGender] = useState(null);
  const [spawn, setSpawn] = useState(null);

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
    <ScrollView>
      <View style={styles.container}>
        <Title>Extended Data</Title>
        <View style={{ marginVertical: 10 }}>
          <Card>
            <Card.Content>
              <Title>What is the fork length?</Title>
              <TextInput
                label="Fork length"
                value={fork}
                keyboardType="number-pad"
                onChangeText={(text) => setFork(text)}
                right={<TextInput.Affix text="inches" />}
              />
            </Card.Content>
          </Card>
        </View>
        <TwoAnswer
          // image={[references.adiposeFin]}
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
        <TwoAnswer
          question="What gender is it?"
          answer1="Male"
          answer2="Female"
          choose={setGender}
        />

        <BackNext navigationHandler={(direction) => navigationHandler(direction)} />

      </View>
    </ScrollView>
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
