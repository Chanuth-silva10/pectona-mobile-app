import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";

import React, { useEffect, useState } from "react";
import HomeHeadNav from "../components/HomeHeadNav";
import BottomNav from "../components/BottomNav";
import { colors } from "../globals/style";
import { firebase } from "../../Firebase/firebaseConfig";



const Pets = ({ navigation }) => {

  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        // console.log(user);
        if (user) {
          // navigation.navigate('home');
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

  console.log(userdata);

  useEffect(() => {
    getuserdata();
  }, [userloggeduid]);
  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <ScrollView style={styles.containerin}>
        <Text style={styles.head1}>
          {userdata ? (
            <Text>{userdata.name}</Text>
          ) : (
            "loading"
          )}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Pets;

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
