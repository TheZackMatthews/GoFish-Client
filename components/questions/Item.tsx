import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IItem {
  title: string,
  fishSpecies: string,
  fishCount: number,
  image: any,
  comments: string,
  lat: number,
  long: number,
}

const Item = ({
  title, fishSpecies, fishCount, image, comments, lat, long,
}: IItem) => (
  <View style={{ marginHorizontal: 15 }}>
    <Text style={{ fontWeight: '500' }}>
      <Icon name="fish" />
      {` Fish status: ${title}`}
    </Text>
    <Text>{`Fish species: ${fishSpecies}`}</Text>
    <Text>{`Fish count: ${fishCount}`}</Text>
    <Text>{image ? 'Image present' : 'No image present'}</Text>
    <Text>{`Location: ${lat} x ${long}`}</Text>
    <Text>{`Comments: ${comments}`}</Text>
  </View>
);

const renderItem = ({ item }: { item: IItem }) => (
  <Item
    title={item.title}
    fishSpecies={item.fishSpecies}
    fishCount={item.fishCount}
    image={item.image}
    comments={item.comments}
    lat={item.lat}
    long={item.long}
  />
);

export default renderItem;
