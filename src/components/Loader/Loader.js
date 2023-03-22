import { Text, View } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import Lottie from "lottie-react-native";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const Loader = ({ text }) => {
  return (
    <View style={styles.loaderContainer}>
      <Lottie
        source={require("../../../assets/animation/loader.json")}
        autoPlay
        loop
        style={{ width: 100, height: 100 }}
      />
      <Text>{text ? text : "Loading..."}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
