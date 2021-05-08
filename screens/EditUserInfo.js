import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import images from '../images';
import { COLORS, SIZES, FONTS } from '../constants/theme';

function EditUserInfo(props) {

  function info(){
    return (
      <View style={styles.info}>
        <Text style={styles.infoText}>Contact Information</Text>          
        <View style={{flexDirection:'row'}}>
          <Text style={styles.infoTextCategory}>Phone Number:</Text>
          <Text style={styles.infoText}>333-333-3333</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.infoTextCategory}>Email:</Text>
          <Text style={styles.infoText}>kim@gmail.com</Text>
        </View>
      </View>
    );
  }

  function renderButton(key) {
    return (
        <View style={{ margin: SIZES.padding * 3 }}>
            <TouchableOpacity
                style={{
                    height: 60,
                    backgroundColor: COLORS.black,
                    borderRadius: SIZES.radius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop:SIZES.padding
                }}
                onPress={() => console.log({key})}
            >
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{key}</Text>
            </TouchableOpacity>
        </View>
    )
  }
  return (
    <View style={styles.container}>
      <Image
              source={images.profilePic}
              style={styles.profilePic}
            />
      <Text style={styles.profileName}> Kimberly Innes </Text>
      {info()}
      {renderButton('Edit Info')}
      {renderButton('User Map')}

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:COLORS.lime,
    paddingTop:SIZES.height* 0.1,
  },
  profileName:{
    color: COLORS.lightGreen,  
    ...FONTS.h2, 
    marginBottom:20,
    alignSelf:'center'
  },
  profilePic:{
    width:SIZES.height * 0.2, 
    height: SIZES.height * 0.2,
    borderRadius:SIZES.radius,
    alignSelf:'center'
  },
  info:{
    alignSelf:'flex-start',
    marginLeft:SIZES.padding*3,

  },
  infoTextCategory:{
    color: COLORS.black,
    ...FONTS.h3
  },
  infoText:{
    flexDirection:'row',
    color: COLORS.white,
    ...FONTS.h3
  }
})

export default EditUserInfo;