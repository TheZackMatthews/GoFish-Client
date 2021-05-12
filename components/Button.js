import React from "react";
import { Text, View, TouchableOpacity} from "react-native";
import styles from "../styles/FormsStyles";

function renderButton({title}) {
  return (
    <View style={styles.buttonMain}>
      <TouchableOpacity
        // style={styles.submitButton}
        // onPress={submitHandler}
        >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}


export default renderButton;
