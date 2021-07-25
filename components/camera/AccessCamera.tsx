import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Colors, useTheme, List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { DefaultRootState } from '../../interfaces/state';

interface Props {
  navigation: {
    navigate: (page: string) => void,
  }
}

const AccessCamera = ({ navigation }: Props) => {
  const images = useSelector((state: DefaultRootState) => state.pin.images);
  const theme = useTheme();
  console.log(images);
  
  const renderImageList = () => {
    if (images && images.length) {
      return images.map((pic, i) => {
        const title = `Picture ${i + 1} (${pic.category ? pic.category : "No category"})`
        return (
          <List.Item
            key={pic.uri}
            title={title}
            description={pic.comment}
        />)
      })
    }
  }

  return (
    <View style={{
      justifyContent: 'center',
      flexDirection: 'column',
      marginVertical: 15,
    }}
    >
      {renderImageList()}
      <TouchableOpacity
        style={{
          alignSelf: 'center',
        }}
        onPress={() => navigation.navigate('Camera')}
      >
        <Avatar.Icon
          style={{ backgroundColor: theme.colors.medGreen }}
          icon="camera"
          color={Colors.white}
          size={50}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AccessCamera;
