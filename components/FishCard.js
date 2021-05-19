import React from 'react';
import {
  Card, Title, Paragraph,
} from 'react-native-paper';
import PropTypes from 'prop-types';

const FishCard = ({ title, characteristic, pic }) => (

  <Card>
    <Card.Content>
      <Title>{title}</Title>
      <Paragraph>{characteristic}</Paragraph>
    </Card.Content>
    <Card.Cover source={pic} />
  </Card>

);

FishCard.propTypes = {
  title: PropTypes.string,
  characteristic: PropTypes.string,
  pic: PropTypes.string,
};

FishCard.defaultProps = {
  title: '',
  characteristic: '',
  pic: '',
};

export default FishCard;
