import { Text, View, StatusBar, ScrollView, Alert, Image } from "react-native";

import React, { useEffect, useState } from "react";
import HomeHeadNav from "../../components/HomeHeadNav";
import BottomNav from "../../components/BottomNav";
import { firebase } from "../../../Firebase/firebaseConfig";
import { userProfileStyles } from "./UserProfileStyles.js";
import Card from "../../components/Card/Card";
import { HStack } from "@react-native-material/core";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Users from "./Users";

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [id, setID] = useState([]);
  const [user, setUser] = useState({});

  const getUsers = async () => {
    const usersRef = firebase.firestore().collection("UserData");
    usersRef.onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
      setID(snapshot.docs.map((doc) => doc.id));
    });
  };

  console.log();
  useEffect(() => {
    getUsers();
  }, []);

  const showConfirmDialog = (id) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete the user?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteItem(id);
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const deleteItem = (id) => {
    firebase
      .firestore()
      .collection("UserData")
      .doc(id)
      .delete()
      .then(() => {
        console.log("User deleted!");
      });

    getUsers();
  };

  return (
    <View style={userProfileStyles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View style={userProfileStyles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: "100%" }}
      >
        <Text style={userProfileStyles.head1}>User List</Text>
        {users.map((user, index) => {
          return (
            <Users
              key={index}
              image={user?.userImg}
              name={user?.name}
              email={user?.email}
              phone={user?.phone}
              address={user?.address}
              onPressView={() => {
                console.log("view is working " + id[index]);
              }}
              onPressDelete={() => {
                showConfirmDialog(id[index]);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default UserList;
