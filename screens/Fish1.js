import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';

function renderMainButton(key) {
  return (
      <View style={{ margin: SIZES.padding }}>
          <TouchableOpacity
              style={{
                  height: 60,
                  backgroundColor: COLORS.black,
                  borderRadius: SIZES.radius,
                  alignItems: 'center',
                  justifyContent: 'center',
              }}
              onPress={() => console.log(key)}
          >
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{key}</Text>
          </TouchableOpacity>
      </View>
  )
}

function renderNavigationButton(key) {
  return (
      <View style={{ margin: SIZES.padding*2, alignItems: key==='Back'? 'flex-start':'flex-end'}}>
          <TouchableOpacity
              style={{
                  height: 60,
                  backgroundColor: COLORS.yellow,
                  borderRadius: SIZES.radius,
                  padding: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  
              }}
              onPress={() => console.log(key)}
          >
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{key}</Text>
          </TouchableOpacity>
      </View>
  )
}

function Question(question) {
  return (
    <View style={styles.question}>
     <Text style={{...FONTS.h1}}>{question}</Text> 
    </View>    
  );
}
function Fish1(props) {
  return (
    <View style={styles.container}>
      <View>
        {Question('Is it alive or dead?')}
      </View>

      <View>
      {renderMainButton('Alive')}
      {renderMainButton('Dead')} 
      </View>
      
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
      {renderNavigationButton('Back')}
      {renderNavigationButton('Next')}  
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'space-around',
    backgroundColor:COLORS.lime,
    paddingTop:100
  },
  question:{
    alignItems:'center'
  }
})

export default Fish1;