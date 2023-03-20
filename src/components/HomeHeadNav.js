import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../globals/style";

const HomeHeadNav = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Fontisto
        name="nav-icon-list-a"
        size={20}
        color="black"
        style={styles.myicon}
      />
      <View style={styles.containerin}>
        <MaterialCommunityIcons
          name="dog"
          size={26}
          color="black"
          style={styles.myicon}
        />
        <Text style={styles.mytext}>Pectona</Text>
        <MaterialCommunityIcons
          name="dog"
          size={26}
          color="black"
          style={styles.myicon}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("userprofile");
        }}
      >
        <FontAwesome5
          name="user-circle"
          size={26}
          color="black"
          style={styles.myicon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeadNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    borderBottomColor: colors.mtg,
    borderBottomWidth: 0.5,
    backgroundColor: "#fff",
    elevation: 20,
  },
  containerin: {
    flexDirection: "row",
    alignItems: "center",
  },
  myicon: {
    color: "#694fad",
  },
  mytext: {
    color: "#694fad",
    fontSize: 24,
  },
});
