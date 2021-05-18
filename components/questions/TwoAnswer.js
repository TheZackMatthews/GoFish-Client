import React, { useState } from 'react';
import { View, Image, ImageStore } from 'react-native';
import PropTypes from 'prop-types';
import { Card, Title, List } from 'react-native-paper';
import { SIZES } from '../../constants/theme';

const TwoAnswer = ({
  question, answer1, answer2, choose, image,
}) => {
  const [selected, setSelected] = useState(null);

  const answer1Style = () => {
    if (selected === answer1) {
      return {
        backgroundColor: 'lightblue',
      };
    }
    return null;
  };

  const answer2Style = () => {
    if (selected === answer2) {
      return {
        backgroundColor: 'lightblue',
      };
    }
    return null;
  };

  const pressHandler = (answer) => {
    choose(answer);
    setSelected(answer);
  };

  const renderImages = () => {
    if (image.length === 1) {
      return <Image style={{ width: SIZES.width - 200, height: 200 }} source={image[0]} />;
    }
    let i = 0;
    return image.map((img) => {
      i += 1;
      return <Image key={i} style={{ width: SIZES.width - 200, height: 200 }} source={img} />;
    });
  };
  console.log(image)
  return (
    <View style={{ marginVertical: 10 }}>
      <Card>
        <Card.Content>
          <Title>{question}</Title>
          <View>
            {image[0].length > 0 && renderImages()}
            <List.Item
              style={answer1Style()}
              title={answer1}
              onPress={() => pressHandler(answer1)}
            />
            <List.Item
              style={answer2Style()}
              title={answer2}
              onPress={() => pressHandler(answer2)}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

TwoAnswer.propTypes = {
  question: PropTypes.string,
  answer1: PropTypes.string || PropTypes.number,
  answer2: PropTypes.string || PropTypes.number,
  choose: PropTypes.func,
  image: PropTypes.arrayOf(PropTypes.string),
};

TwoAnswer.defaultProps = {
  question: '',
  answer1: '',
  answer2: '',
  choose: () => null,
  image: [''],
};

export default TwoAnswer;
