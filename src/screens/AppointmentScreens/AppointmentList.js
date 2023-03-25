import { StatusBar, Alert, TouchableOpacity } from "react-native";

import React, { useEffect, useState } from "react";
import HomeHeadNav from "../../components/HomeHeadNav";
import BottomNav from "../../components/BottomNav";
import { firebase } from "../../../Firebase/firebaseConfig";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import { appointmentStyles } from "./AppointmentStyles.js";
import Card from "../../components/Card/Card";
import { HStack } from '@react-native-material/core';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const AppointmentList = ({ navigation }) => {

  const [loggeduserid, setLoggeduserid] = useState(null);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setLoggeduserid(user.uid);
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
      .where("uid", "==", loggeduserid);
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

  const [appointmentData, setAppointmentData] = useState([]);
  const [id, setID] = useState(null);

  const getAppointments = async () => {
    const appointmentsRef = firebase.firestore().collection("AppointmentData")
    appointmentsRef.onSnapshot((snapshot) => {
      setAppointmentData(snapshot.docs.map((doc) => doc.data()));
      setID(snapshot.docs.map((doc) => doc.id));
    });
  };

  const getPetDetails = async (id) => {
    const petRef = firebase.firestore().collection("PettData").where("name", "==", id)
    petRef.onSnapshot((snapshot) => {
      return snapshot.docs.map((doc) => doc.data());
      //setAppointmentData(snapshot.docs.map((doc) => doc.data()));
      //setID(snapshot.docs.map((doc) => doc.id));
    });
  };

  console.log("Appointment id", id);

  useEffect(() => {
    getAppointments();
    getuserdata();
  }, [loggeduserid]);

  const showConfirmDialog = (id) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to cancel the appointment?",
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
      .collection("AppointmentData")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Appointment is cancelled!");
      });

    getAppointments();
  };

  return (

    <View style={appointmentStyles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View style={appointmentStyles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <ScrollView style={appointmentStyles.containerin}>
      {loggeduserid == "sEPcC2qC6gTXZWG7Qm8z1u3oX1x1" ? 
          <><Text style={appointmentStyles.head1}>
            Hello Piyo
          </Text><Text style={appointmentStyles.para}>
              You have the following appointments:
            </Text></>
        : null}


        {
          appointmentData.map((appointment, index) => {

            return (

              appointment.userid == loggeduserid ?

              <Card
              title={`${appointment.appointmentid}`}
              children={
                <View key={index}>
                  <HStack m={2} spacing={80} >
                    <View>
                      <Text style={appointmentStyles.lable}>Doctor - {appointment.doctorid}</Text>
                      <Text style={appointmentStyles.lable}>Pet - {appointment.petid}</Text>
                      <Text style={appointmentStyles.lable}>Date - {appointment.date}</Text>
                    </View>
                    <View style={appointmentStyles.iconContainer}>
                      <HStack m={2} spacing={5}>
                        <MaterialIcons
                          name="cancel"
                          size={30}
                          onPress={() => {
                            showConfirmDialog(id[index]);
                          }}
                        />
                      </HStack>
                    </View>
                  </HStack>
                </View>
              }
            />
          : null
            )
          })
        }

<View style={appointmentStyles.editbuttonContainer}>
            <Button
              title="Make an appointment"
              color="#917DCA"
              onPress={() => navigation.navigate('make_appointment')}
            >
            </Button>
          </View>
      </ScrollView>
    </View>
  );
}

export default AppointmentList;