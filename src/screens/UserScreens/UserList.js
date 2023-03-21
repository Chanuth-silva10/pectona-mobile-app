import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";

import React, { useEffect, useState } from "react";
import HomeHeadNav from "../../components/HomeHeadNav";
import BottomNav from "../../components/BottomNav";
import { colors } from "../../globals/style";
import { firebase } from "../../../Firebase/firebaseConfig";
import { userProfileStyles } from "./UserProfileStyles.js";
import Card from "../../components/Card/Card";
import { HStack } from "@react-native-material/core";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [id, setID] = useState([]);
  // const [user, setUser] = useState({});

  const getorders = async () => {
    const ordersRef = firebase.firestore().collection("UserData");
    ordersRef.onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
      setID(snapshot.docs.map((doc) => doc.id));
    });
  };

  console.log(id);

  useEffect(() => {
    getorders();
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
        {users.map((order, index) => {
          return (
            <Card
              children={
                <View key={index}>
                  <HStack m={2} spacing={80}>
                    <View>
                      <Text style={userProfileStyles.lable}>
                        User Name : {order.name}
                      </Text>
                      <Text style={userProfileStyles.lable}>
                        User Email : {order.email}
                      </Text>
                      <Text style={userProfileStyles.lable}>
                        User Address: {order.phone}
                      </Text>
                      <Text style={userProfileStyles.lable}>
                        User Phone : {order.phone}
                      </Text>
                    </View>
                    <View style={userProfileStyles.iconContainer}>
                      <HStack m={2} spacing={5}>
                        <MaterialIcons
                          name="delete"
                          size={30}
                          // onPress={() => deleteItem(order.uid)}
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
