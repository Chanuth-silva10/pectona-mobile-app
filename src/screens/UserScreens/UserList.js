import {Text, View, StatusBar, ScrollView } from "react-native";

import React, { useEffect, useState } from "react";
import HomeHeadNav from "../../components/HomeHeadNav";
import BottomNav from "../../components/BottomNav";
import { firebase } from "../../../Firebase/firebaseConfig";
import { userProfileStyles } from "./UserProfileStyles.js";
import Card from "../../components/Card/Card";
import { HStack } from "@react-native-material/core";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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

  console.log(id);
  useEffect(() => {
    getUsers();
  }, []);

  // const deleteItem = () => {
  //   firebase
  //     .firestore()
  //     .collection("UserData")
  //     .doc("sc3xrpL7yJdB3swjpOza")
  //     .delete()
  //     .then(() => {
  //       console.log("User deleted!");
  //     });

  //   getorders();
  // };

  return (
    <View style={userProfileStyles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View style={userProfileStyles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <ScrollView style={userProfileStyles.containerin}>
        <Text style={userProfileStyles.head1}>User List</Text>
        {users.map((user, index) => {
          return (
            <Card
              children={
                <View key={index}>
                  <HStack m={2} spacing={80}>
                    <View>
                      <Text style={userProfileStyles.lable}>
                        User Name : {user.name}
                      </Text>
                      <Text style={userProfileStyles.lable}>
                        User Email : {user.email}
                      </Text>
                      <Text style={userProfileStyles.lable}>
                        User Address: {user.phone}
                      </Text>
                      <Text style={userProfileStyles.lable}>
                        User Phone : {user.phone}
                      </Text>
                    </View>
                    <View style={userProfileStyles.iconContainer}>
                      <HStack m={2} spacing={5}>
                        <MaterialIcons
                          name="delete"
                          size={30}
                          // onPress={() => deleteItem(user.uid)}
                        />
                      </HStack>
                    </View>
                  </HStack>
                </View>
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default UserList;
