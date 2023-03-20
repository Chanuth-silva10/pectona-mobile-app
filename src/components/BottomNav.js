import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../globals/style";
import { FontAwesome5 } from "@expo/vector-icons";
const BottomNav = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.btncon1}>
        <Entypo
          name="home"
          size={30}
          color="black"
          style={styles.icon1}
          onPress={() => {
            navigation.navigate("home");
          }}
        />
      </View>
      <View style={styles.btncon1}>
        <MaterialIcons
          name="pets"
          size={30}
          color="black"
          style={styles.icon1}
          onPress={() => {
            navigation.navigate("user2");
          }}
        />
      </View>
      <View style={styles.btncon1}>
        <Fontisto
          name="doctor"
          size={30}
          color="black"
          style={styles.icon1}
          onPress={() => {
            navigation.navigate("user2");
          }}
        />
      </View>
      <View style={styles.btncon1}>
        <FontAwesome5
          name="wallet"
          size={30}
          color="black"
          style={styles.icon1}
          onPress={() => {
            navigation.navigate("user1");
          }}
        />
      </View>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    elevation: 30,
    borderTopColor: colors.mtg,
    borderTopWidth: 0.5,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  btncon1: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  btncon2: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top: -20,
    backgroundColor: colors.mtg,
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  icon2: {
    color: "white",
  },
  icon1: {
    color: colors.mtg,
  },
});
