import React from "react";
import { Text, View, Image } from "react-native";

import images from "../images";
import { styles } from "../styles/FormsStyles";

const GoFishLogo = ({ title }) => {
  return (
    <View style={styles.headContainer}>
      {/* <Text style={styles.firstHeader}>Go Fish</Text> */}
      <Image style={styles.logo2} source={images.logo2} />
      <Text style={styles.signUp}>{title}</Text>
    </View>
  );
};


export default GoFishLogo;
