import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';
import styles from '../../styles/UserStyles';

interface Props {
  creekName: string,
  setCreekName: React.Dispatch<React.SetStateAction<string>>,
  list: string[],
  label: string,
}

const AutoComplete = ({ creekName, setCreekName, list, label }: Props) => {
  const [query, setQuery] = useState<string>('');
  const [filterData, setFilterData] = useState<string[]>([]);

  const SearchDataFromJSON = (input: string) => {
    if (input) {
      const regex = new RegExp(`${input.trim()}`, 'i');
      setFilterData(
        list.filter((data) => data.search(regex) >= 0),
      );
    } else {
      setFilterData([]);
    }
  };

  return (
    <View>
      <View>
        <Text>{label}</Text>
        <Autocomplete
          data={filterData || []}
          value={query}
          autoCorrect
          hideResults={false}
          onChangeText={(text) => {
            SearchDataFromJSON(text);
            setQuery(text);
          }}
          inputContainerStyle={
            (creekName !== '') ?
            styles.SearchBoxCompleted : styles.SearchBoxUncomplete
          }
          renderItem={() => (<></>)}
          flatListProps={{
            keyboardShouldPersistTaps: 'always',
            keyExtractor: (item) => item,
            renderItem: ({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setQuery(item);
                  setCreekName(item);
                  setFilterData([]);
                }}
              >
                <Text style={styles.SearchBoxTextItem}>{item}</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </View>
    </View>
  )
}

export default AutoComplete
