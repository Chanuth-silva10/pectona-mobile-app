import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width;

const CustomAlert = ({ message, type }) => {
  return (
    <View style={{ width: windowWidth * 0.8 }}>
      {message != "" ? (
        <View style={[styles.alertContainer, styles[`alertContainer_${type}`]]}>
          <Text>{message}</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  alertContainer: {
    padding: 8,
    marginTop: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.4,
    textAlign: "center",
  },
  alertContainer_error: {
    backgroundColor: "#FF4848"
  },
  alertContainer_success: {
    backgroundColor: "#90ee90",
  },
});
