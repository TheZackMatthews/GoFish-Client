import React from 'react'
import { View } from 'react-native'
import {
  Checkbox,
  Paragraph,
} from 'react-native-paper';

interface Props {
  statement: string,
  agreed: boolean,
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>
}

const Liability = ({ statement, agreed, setAgreed }: Props) => {
  const toggleIsAgreedSafety = () => setAgreed(!agreed);
  return (
    <View>
      <Paragraph style={{ marginTop: 15 }}>
        {statement}
      </Paragraph>
      <View style={{
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
      }}>
      <Paragraph> I agree </Paragraph>
      <Checkbox
        status={agreed ? 'checked' : 'unchecked'}
        onPress={() => toggleIsAgreedSafety()}
      />
      </View>
    </View>
  )
}

export default Liability
