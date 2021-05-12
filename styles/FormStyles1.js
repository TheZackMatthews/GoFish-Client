import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  firstHeader: {
    marginBottom: SIZES.padding,
    color: 'black',
    fontSize: SIZES.largeTitle,
    marginTop: SIZES.padding * 4,
  },
  secondHeader:{
    marginBottom: SIZES.padding,
    color: 'black',
    fontSize: SIZES.h3,
    marginTop: SIZES.padding * 4,
  },
  logo: {
    width: 60,
    height: 60,
  },
  signUp: {
    marginTop: SIZES.padding * 5,
    color: 'black',
    fontSize: SIZES.h1,
  },
  textInputStyle: {
    marginVertical: SIZES.padding,
    
    borderBottomWidth: 1,
    height: 40,
    
    ...FONTS.body3,
  },
  button: {
    position: "absolute",
    right: 0,
    bottom: 10,
    height: 30,
    width: 30,
  },
  view: { marginTop: SIZES.padding * 2 },
  label: { ...FONTS.body3 },
  outsideView: {
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding * 3,
  },
  signInLink: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
  },
  textP: { alignSelf: "flex-end", ...FONTS.h4 },
  submitButton: {
    height: 60,
    backgroundColor: COLORS.black,
    borderRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.padding * 5,
  },
  submitView: { 
    marginLeft: SIZES.padding * 3,
    marginRight: SIZES.padding * 3,
  },
  buttonText: { color: COLORS.white, ...FONTS.h3 },
  logo2: {
    width: 350,
    height: 170,
  },
  infoText:{
    alignSelf:'flex-start',
    marginLeft:SIZES.padding*3,
    marginTop:30
  },
  infoTextCategory:{
    color: COLORS.black,
    ...FONTS.h4,
  },
  infoText:{
    color: COLORS.darkgray,
    ...FONTS.h4
  },
  buttonMain:{
    height: 60,
    backgroundColor: COLORS.black,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:SIZES.padding
  }
})


export default styles;