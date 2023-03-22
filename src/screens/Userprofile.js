import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { navbtn, navbtnin } from "../globals/style";
import { AntDesign } from "@expo/vector-icons";
import { colors, btn2, btn3 } from "../globals/style";
import ProfileHeadNav from "../components/ProfileHeadNav";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import { firebase } from "../../Firebase/firebaseConfig";
import BottomNav from "../components/BottomNav";
const Userprofile = ({ navigation }) => {
  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        // console.log(user);
        if (user) {
          setUserloggeduid(user.uid);
        } else {
          console.log("no user");
        }
      });
    };
    checklogin();
  }, []);

  const getuserdata = async () => {
    const docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userloggeduid);
    const doc = await docRef.get();
    if (!doc.empty) {
      doc.forEach((doc) => {
        setUserdata(doc.data());
      });
    } else {
      console.log("no user data");
    }
  };

  useEffect(() => {
    getuserdata();
  }, [userloggeduid]);

  // console.log(userdata);

  const [edit, setEdit] = useState(false);
  const [newname, setNewName] = useState("");
  const [newaddress, setNewAddress] = useState("");

  const updateuser = async () => {
    const docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userloggeduid);
    const doc = await docRef.get();
    if (!doc.empty) {
      if (newname !== "") {
        doc.forEach((doc) => {
          doc.ref.update({
            name: newname,
          });
        });
      }
      if (newaddress !== "") {
        doc.forEach((doc) => {
          doc.ref.update({
            address: newaddress,
          });
        });
      }
      alert("your user data is updated");
      getuserdata();
      setEdit(false);
      setPasswordedit(false);
    } else {
      console.log("no user data");
    }
  };

  const [Passwordedit, setPasswordedit] = useState(false);
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");

  const updatepassword = async () => {
    const reauthenticate = (oldpassword) => {
      var user = firebase.auth().currentUser;
      var cred = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldpassword
      );
      return user.reauthenticateWithCredential(cred);
    };
    let docRef = firebase
      .firestore()
      .collection("UserData")
      .where("uid", "==", userloggeduid);
    let doc = await docRef.get();
    reauthenticate(oldpassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newpassword)
          .then(() => {
            // alert("Password updated!");

            if (!doc.empty) {
              doc.forEach((doc) => {
                doc.ref.update({
                  password: newpassword,
                });
              });
              alert("your password is updated");
            }
          })
          .catch((error) => {
            alert("Server Issue");
          });
      })
      .catch((error) => {
        alert("Wrong Password");
      });
  };

  const logoutuser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("you are logged out");
        navigation.navigate("login");
      })
      .catch((error) => {
        alert("Server Issue");
      });
  };
  return (
    <View style={styles.containerout}>
      <ScrollView>
        <ProfileHeadNav navigation={navigation} />
       
        {edit == false && Passwordedit == false && (
          <View>
            <View style={styles.container}>
              <View style={styles.containerin}>
                <Text style={styles.head2}>
                  Name:{" "}
                  {userdata ? (
                    <Text style={styles.head2in}>{userdata.name}</Text>
                  ) : (
                    "loading"
                  )}
                </Text>

                <Text style={styles.head2}>
                  Email:{" "}
                  {userdata ? (
                    <Text style={styles.head2in}>{userdata.email}</Text>
                  ) : (
                    "loading"
                  )}
                </Text>

                <Text style={styles.head2}>
                  Phone:{" "}
                  {userdata ? (
                    <Text style={styles.head2in}>{userdata.phone}</Text>
                  ) : (
                    "loading"
                  )}
                </Text>

                <Text style={styles.head2}>
                  Address:{" "}
                  {userdata ? (
                    <Text style={styles.head2in}>{userdata.address}</Text>
                  ) : (
                    "loading"
                  )}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setEdit(!edit);
                setPasswordedit(false);
              }}
            >
              <View style={btn3}>
                <Text style={styles.btntxt}>Edit Details</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setPasswordedit(!Passwordedit);
                setEdit(false);
              }}
            >
              <View style={btn3}>
                <Text style={styles.btntxt}>Change Password</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {edit == true && (
          <View>
            <View style={styles.container}>
              <Text style={styles.head1}>Edit Profile</Text>
              <View style={styles.containerin}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onChangeText={(e) => setNewName(e)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  onChangeText={(e) => setNewAddress(e)}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => updateuser()}>
              <View style={btn3}>
                <Text style={styles.btntxt}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {Passwordedit == true && (
          <View>
            <View style={styles.container}>
              <Text style={styles.head1}>Change Password</Text>
              <View style={styles.containerin}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  onChangeText={(e) => setOldPassword(e)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter a new password"
                  onChangeText={(e) => setNewPassword(e)}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => updatepassword()}>
              <View style={btn3}>
                <Text style={styles.btntxt}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity onPress={() => logoutuser()}>
          <View style={btn3}>
            <Text style={styles.btntxt}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <BottomNav></BottomNav>
    </View>
  );
};

export default Userprofile;

const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    backgroundColor: "#fff",
    width: windowWidth,
    height: windowHeight,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: windowWidth,
  },
  head1: {
    fontSize: 30,
    fontWeight: "400",
    marginVertical: 20,
    color: colors.mtg,
  },
  containerin: {
    width: windowWidth * 0.9,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.mtg,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 75,
  },
  head2: {
    fontSize: 20,
    fontWeight: "300",
    marginTop: 20,
  },
  head2in: {
    fontSize: 20,
    fontWeight: "350",
  },
  inputout: {
    flexDirection: "row",
    width: windowWidth,
    marginVertical: 10,
    backgroundColor: "#694fad",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 20,
  },
  btntxt: {
    fontSize: 20,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
    padding: 10,
  },
  input: {
    width: windowWidth * 0.8,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 20,
  },
});
