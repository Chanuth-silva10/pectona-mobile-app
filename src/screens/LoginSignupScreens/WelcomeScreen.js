import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import logo from "../../../assets/logo.png";
import { colors, hr80 } from "../../globals/style";
import { firebase } from "../../../Firebase/firebaseConfig";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const WelcomeScreen = ({ navigation }) => {
  const [userlogged, setUserlogged] = useState(null);
  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserlogged(user);
        } else {
          console.log("no user");
        }
      });
    };
    checklogin();
  }, []);

  const handlelogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUserlogged(null);
        console.log("signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pectona</Text>
      <View style={styles.logoout}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={hr80} />
      <Text style={styles.text}>Find the best doctor for your life</Text>
      <View style={hr80} />

      {userlogged === null ? (
        <View style={styles.btnout}>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={styles.btn}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={styles.btn}>Log In</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.logged}>
          <Text style={styles.txtlog}>
            Signed in as <Text style={styles.txtlogin}>{userlogged.email}</Text>
          </Text>
          <View style={styles.btnout}>
            <TouchableOpacity onPress={() => navigation.navigate("home")}>
              <Text style={styles.btn}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlelogout()}>
              <Text style={styles.btn}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mbg,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    color: colors.mtg,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "500",
  },
  logoout: {
    width: windowWidth,
    height: windowHeight * 0.32,
    alignItems: "center",
  },
  logo: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.25,
  },
  text: {
    fontSize: 18,
    width: windowWidth * 0.8,
    color: colors.mtg,
    textAlign: "center",
    fontWeight: "500",
  },
  btnout: {
    flexDirection: "row",
  },
  btn: {
    fontSize: 20,
    color: colors.col1,
    textAlign: "center",
    marginVertical: 30,
    marginHorizontal: 10,
    fontWeight: "700",
    backgroundColor: colors.mtg,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  logged: {
    alignItems: "center",
  },
  txtlog: {
    fontSize: 16,
    color: colors.mtg,
  },
  txtlogin: {
    fontSize: 16,
    color: "red",
    fontWeight: "400",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
});
export default WelcomeScreen;
