import { StyleSheet, StatusBar } from "react-native";

import React, { useEffect, useState } from "react";
import HomeHeadNav from "../../components/HomeHeadNav";
import BottomNav from "../../components/BottomNav";
import { firebase } from "../../../Firebase/firebaseConfig";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import { appointmentStyles } from "./AppointmentStyles.js";
import Card from "../../components/Card/Card";
import { HStack, Provider } from '@react-native-material/core';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const AppointmentList = ({ navigation }) => {

  const [loggeduserid, setLoggeduserid] = useState(null);
  const [appointmentdata, setAppointmentdata] = useState([]);

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

  console.log("Loggeduserid: " + loggeduserid);

  const getAppointments = async () => {
    const appointmentsRef = await firebase.firestore().collection("AppointmentData").where("doctorid", "==", loggeduserid).get();
    console.log ("appointmentsRef: " + appointmentsRef.empty);
    appointmentsRef.onSnapshot((snapshot) => {
      setAppointmentdata(snapshot.docs.map((doc) => doc.data()));
    });
  };

  console.log(appointmentdata);

  useEffect(() => {
    getAppointments();
  }, [loggeduserid]);

  console.log(appointmentdata);
  console.log(loggeduserid);

  return (

    <View style={appointmentStyles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View style={appointmentStyles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <ScrollView style={appointmentStyles.containerin}>
        <View style={appointmentStyles.editbuttonContainer}>
          <Button
            title="Make an appointment"
            color="#917DCA"
            onPress={() => navigation.navigate('make_appointment')}
          >
          </Button>
        </View>


        {
          appointmentdata.map((appointment, index) => {

            console.log("Inside appointmentdata map")
            return (

              appointment.doctorid == loggeduserid ?

                <Card
                  title={`${appointment.date}`}
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

export default AppointmentList;
