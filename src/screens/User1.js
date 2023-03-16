import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
} from "react-native";

import React from "react";
import HomeHeadNav from "../components/HomeHeadNav";
import BottomNav from "../components/BottomNav";
import { colors } from "../globals/style";

const User1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <ScrollView style={styles.containerin}>
        <Text style={styles.head1}>User 1</Text>
      </ScrollView>
    </View>
  );
};

export default User1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  bottomnav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.mtg,
    zIndex: 20,
  },
  containerin: {
    marginTop: 10,
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    marginBottom: 100,
  },
  head1: {
    fontSize: 30,
    color: colors.mtg,
    textAlign: "center",
    marginVertical: 20,
  },
});
