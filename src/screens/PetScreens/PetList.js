import { StyleSheet, StatusBar } from "react-native";

import React, { useEffect, useState } from "react";
import HomeHeadNav from "../../components/HomeHeadNav";
import BottomNav from "../../components/BottomNav";
import { firebase } from "../../../Firebase/firebaseConfig";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import { petProfileStyles } from "./PetProfileStyles.js";
import Card from "../../components/Card/Card";
import { HStack, Provider } from '@react-native-material/core';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const PetList = ({ navigation }) => {

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

  const [petData, setPetData] = useState([]);
  const [id, setID] = useState(null);

  const getPets = async () => {
    const petsRef = firebase.firestore().collection("PetData")
    petsRef.onSnapshot((snapshot) => {
      setPetData(snapshot.docs.map((doc) => doc.data()));
      setID(snapshot.docs.map((doc) => doc.id));
    });
  };

  console.log(id);

  useEffect(() => {
    getPets();
    getuserdata();
  }, [userloggeduid]);

  console.log(petData);
  console.log(userloggeduid);

  return (

    <View style={petProfileStyles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View style={petProfileStyles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <ScrollView style={petProfileStyles.containerin}>
        <View style={petProfileStyles.editbuttonContainer}>
          <Button
            title="Create a Pet Profile"
            color="#917DCA"
            onPress={() => navigation.navigate('petcreation')}
          >
          </Button>
        </View>


        {
          petData.map((pet, index) => {

            return (

              pet.userid == userloggeduid ?

                <Card
                  title={`${pet.name} the ${pet.species}`}
                  children={
                    <View key={index}>
                      <HStack m={2} spacing={80} >
                        <View>
                          <Text style={petProfileStyles.lable}>Breed - {pet.breed}</Text>
                          <Text style={petProfileStyles.lable}>Gender - {pet.gender}</Text>
                          <Text style={petProfileStyles.lable}>Color - {pet.color}</Text>
                          <Text style={petProfileStyles.lable}>DOB - {pet.dob}</Text>
                        </View>
                        <View style={petProfileStyles.iconContainer}>
                          <HStack m={2} spacing={5}>
                            <MaterialIcons
                              name="edit"
                              size={30}
                            // onPress={() => navigation.navigate(CommonConstants.UPDATE_REMINDER_PATH, { reminderId: item._id })}
                            />
                            <MaterialIcons
                              name="delete"
                              size={30}
                            // onPress={() => handleDeleteId(item._id)}
                            />
                          </HStack>
                        </View>
                      </HStack>
                    </View>
                  }
                />

                :

                null
            )
          })
        }


      </ScrollView>
    </View>
  );
}

export default PetList;