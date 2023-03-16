import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import HomeHeadNav from "../components/HomeHeadNav";

import { AntDesign } from "@expo/vector-icons";
import { colors } from "../globals/style";

import BottomNav from "../components/BottomNav";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar />

      <HomeHeadNav navigation={navigation} />

      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <ScrollView>
        <View style={styles.searchbox}>
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={styles.searchicon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={(e) => {
              setSearch(e);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  searchbox: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    padding: 10,
    margin: 20,
    elevation: 10,
  },
  input: {
    marginLeft: 10,
    width: "90%",
    fontSize: 18,
    color: colors.text1,
  },
  searchicon: {
    color: colors.mtg,
  },
  bottomnav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.mtg,
    zIndex: 20,
  },
});
export default HomeScreen;
