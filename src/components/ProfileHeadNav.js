import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { colors } from "../globals/style";
import { navbtn, navbtnin } from "../globals/style";

const windowWidth = Dimensions.get("window").width;

const ProfileHeadNav = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("home")}>
        <View style={navbtn}>
          <AntDesign name="home" size={25} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>
      <View style={styles.containerin}>
        <Text style={styles.mytext}>Profile</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("userList");
        }}
      >
        <FontAwesome5
          name="user-circle"
          size={35}
          color="black"
          style={styles.myicon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeadNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: windowWidth,
    justifyContent: "space-between",
    padding: 15,
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
    fontSize: 38,
    fontWeight: "450",
  },
});
