import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { titles, colors, btn1, hr80 } from "../../globals/style";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { firebase } from "../../../Firebase/firebaseConfig";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LoginScreen = ({ navigation }) => {
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customerror, setcustomError] = useState("");

  const handlelogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate("welcomepage");
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
        if (
          errorMessage ===
          "Firebase: The email address is badly formatted. (auth/invalid-email)."
        ) {
          setcustomError("Please enter a valid email address");
        } else {
          setcustomError("Incorrect email or password");
        }
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.head1}>Sign In</Text>
          {customerror !== "" && (
            <CustomAlert message={customerror} type="error"></CustomAlert>
          )}
          <View style={styles.inputout}>
            <AntDesign
              name="user"
              size={24}
              color={emailfocus === true ? colors.text1 : colors.text2}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              onFocus={() => {
                setEmailfocus(true);
                setPasswordfocus(false);
                setShowpassword(false);
                setcustomError("");
              }}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputout}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color={passwordfocus == true ? colors.text1 : colors.text2}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              onFocus={() => {
                setEmailfocus(false);
                setPasswordfocus(true);
                setcustomError("");
              }}
              secureTextEntry={showpassword === false ? true : false}
              onChangeText={(text) => setPassword(text)}
            />

            <Octicons
              name={showpassword == false ? "eye-closed" : "eye"}
              size={24}
              color="black"
              onPress={() => setShowpassword(!showpassword)}
            />
          </View>
          <TouchableOpacity style={btn1} onPress={() => handlelogin()}>
            <Text
              style={{
                color: colors.col1,
                fontSize: titles.btntxt,
                fontWeight: "bold",
              }}
            >
              Sign in
            </Text>
          </TouchableOpacity>

          <Text style={styles.forgot}>Forgot Password?</Text>
          <Text style={styles.or}>OR</Text>
          <Text style={styles.gftxt}>Sign In With </Text>

          <View style={styles.gf}>
            <TouchableOpacity>
              <View style={styles.gficon}>
                <AntDesign name="google" size={24} color="#EA4335" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.gficon}>
                <FontAwesome5 name="facebook-f" size={24} color="#4267B2" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={hr80}></View>
          <Text>
            Don't have an account?
            <Text
              style={styles.signup}
              onPress={() => navigation.navigate("signup")}
            >
              {" "}
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
    marginTop: windowHeight * 0.23,
  },
  head1: {
    fontSize: titles.title1,
    color: "#694fad",
    textAlign: "center",
    marginVertical: 10,
    fontWeight: 500,
  },
  inputout: {
    flexDirection: "row",
    width: windowWidth * 0.8,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 20,
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: windowWidth * 0.8,
  },
  forgot: {
    color: colors.text2,
    marginTop: 20,
    marginBottom: 10,
  },
  or: {
    color: colors.mtg,
    marginVertical: 10,
    fontWeight: "bold",
  },
  gftxt: {
    color: colors.text2,
    marginVertical: 10,
    fontSize: 25,
  },
  gf: {
    flexDirection: "row",
  },
  gficon: {
    backgroundColor: "white",
    width: windowWidth * 0.3,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    elevation: 20,
  },
  signup: {
    color: colors.mtg,
  },
  errormsg: {
    color: "red",
    fontSize: 10,
    textAlign: "center",
    marginTop: 10,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default LoginScreen;
