import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { titles, colors, btn1, hr80 } from "../../globals/style";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import { firebase } from "../../../Firebase/firebaseConfig";

const SignupScreen = ({ navigation }) => {
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [phonefocus, setPhonefocus] = useState(false);
  const [namefocus, setNamefocus] = useState(false);

  const [showpassword, setShowpassword] = useState(false);
  const [showcpassword, setShowcpassword] = useState(false);
  const [cpasswordfocus, setcPasswordfocus] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  // console.log(email);

  const [customError, setCustomError] = useState("");
  const [successmsg, setSuccessmsg] = useState(null);

  // const [useruid, setUseruid] = useState('');
  const handleSignup = () => {
    if (password != cpassword) {
      // alert("Password doesn't match");
      setCustomError("Password doesn't match");
      return;
    } else if (phone.length != 10) {
      setCustomError("Phone number should be 10 digit");
      return;
    }
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          console.log(userCredentials?.user.uid);
          console.log("user created");

          if (userCredentials?.user.uid != null) {
            const userRef = firebase.firestore().collection("UserData");
            userRef
              .add({
                email: email,
                password: password,
                // cpassword: cpassword,
                phone: phone,
                name: name,
                address: address,
                uid: userCredentials?.user?.uid,
              })
              .then(() => {
                console.log("data added to firestore");
                setSuccessmsg("User created successfully");
              })
              .catch((error) => {
                console.log("firestore error ", error);
              });
          }
        })
        .catch((error) => {
          console.log("sign up firebase error ", error.message);
          if (
            error.message ==
            "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
          ) {
            setCustomError("Email already exists");
          } else if (
            error.message ==
            "Firebase: The email address is badly formatted. (auth/invalid-email)."
          ) {
            setCustomError("Invalid Email");
          } else if (
            error.message ==
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ) {
            setCustomError("Password should be at least 6 characters");
          } else {
            setCustomError(error.message);
          }
        });
    } catch (error) {
      console.log("sign up system error ", error.message);
    }
  };
  return (
    <View style={styles.container}>
      {successmsg == null ? (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.head1}>Sign Up</Text>
            {customError !== "" && (
              <Text style={styles.errormsg}>{customError}</Text>
            )}
            <View style={styles.inputout}>
              <AntDesign
                name="user"
                size={24}
                color={namefocus === true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                onFocus={() => {
                  setEmailfocus(false);
                  setPasswordfocus(false);
                  setShowpassword(false);
                  setNamefocus(true);
                  setPhonefocus(false);
                  setCustomError("");
                }}
                onChangeText={(text) => setName(text)}
              />
            </View>

            <View style={styles.inputout}>
              <Entypo
                name="email"
                size={24}
                color={emailfocus === true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onFocus={() => {
                  setEmailfocus(true);
                  setPasswordfocus(false);
                  setShowpassword(false);
                  setNamefocus(false);
                  setPhonefocus(false);
                  setCustomError("");
                }}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            {/*  */}

            <View style={styles.inputout}>
              <Feather
                name="smartphone"
                size={24}
                color={phonefocus === true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onFocus={() => {
                  setEmailfocus(false);
                  setPasswordfocus(false);
                  setShowpassword(false);
                  setNamefocus(false);
                  setPhonefocus(true);
                  setCustomError("");
                }}
                onChangeText={(text) => setPhone(text)}
              />
            </View>

            {/* password start */}
            <View style={styles.inputout}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={24}
                color={passwordfocus == true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                onFocus={() => {
                  setEmailfocus(false);
                  setPasswordfocus(true);
                  setShowpassword(false);
                  setNamefocus(false);
                  setPhonefocus(false);
                  setCustomError("");
                }}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={showpassword === false ? true : false}
              />

              <Octicons
                name={showpassword == false ? "eye-closed" : "eye"}
                size={24}
                color="black"
                onPress={() => setShowpassword(!showpassword)}
              />
            </View>
            {/*  */}
            <View style={styles.inputout}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={24}
                color={cpasswordfocus == true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onFocus={() => {
                  setEmailfocus(false);
                  setPasswordfocus(false);
                  setShowpassword(true);
                  setNamefocus(false);
                  setPhonefocus(false);
                  setCustomError("");
                }}
                onChangeText={(text) => setcPassword(text)}
                secureTextEntry={showcpassword === false ? true : false}
              />

              <Octicons
                name={showcpassword == false ? "eye-closed" : "eye"}
                size={24}
                color="black"
                onPress={() => setShowcpassword(!showcpassword)}
              />
            </View>
            {/* password end */}

            <Text style={styles.address}>Please enter your address</Text>
            <View style={styles.inputout}>
              <TextInput
                style={styles.input1}
                placeholder="Enter your Address"
                onChangeText={(text) => setAddress(text)}
                onPress={() => {
                  setEmailfocus(false);
                  setPasswordfocus(false);
                  setShowpassword(false);
                  setNamefocus(false);
                  setPhonefocus(false);
                  setCustomError("");
                }}
              />
            </View>

            <TouchableOpacity style={btn1} onPress={() => handleSignup()}>
              <Text
                style={{
                  color: colors.col1,
                  fontSize: titles.btntxt,
                  fontWeight: "bold",
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>

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
            <Text style={styles.ahc}>
              Already have an account?
              <Text
                style={styles.signup}
                onPress={() => navigation.navigate("login")}
              >
                {" "}
                Sign In
              </Text>
            </Text>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.container1}>
          <Text style={styles.successmessage}>{successmsg}</Text>
          <TouchableOpacity
            style={btn1}
            onPress={() => navigation.navigate("login")}
          >
            <Text
              style={{
                color: colors.col1,
                fontSize: titles.btntxt,
                fontWeight: "bold",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={btn1} onPress={() => setSuccessmsg(null)}>
            <Text
              style={{
                color: colors.col1,
                fontSize: titles.btntxt,
                fontWeight: "bold",
              }}
            >
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    alignItems: "center",
    marginTop: windowHeight * 0.05,
  },
  container1: {
    flex: 1,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  head1: {
    fontSize: titles.title1,
    color: colors.mtg,
    textAlign: "center",
    marginVertical: 10,
  },
  inputout: {
    flexDirection: "row",
    width: windowWidth * 0.8,
    marginVertical: 9,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
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
    color: colors.mtg,
    marginBottom: 10,
    fontSize: 25,
  },
  gf: {
    flexDirection: "row",
  },
  gficon: {
    backgroundColor: "white",
    width: windowWidth * 0.2,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    elevation: 20,
  },
  signup: {
    color: colors.text1,
  },
  address: {
    fontSize: 18,
    color: colors.text2,
    textAlign: "center",
    marginTop: 20,
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
  successmessage: {
    color: "green",
    fontSize: 18,
    textAlign: "center",
    margin: 10,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  ahc: {
   marginBottom: windowHeight * 0.05,
  },
});

export default SignupScreen;
