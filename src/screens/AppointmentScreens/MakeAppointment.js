import { StyleSheet, StatusBar } from "react-native";

import React, { useEffect, useState } from "react";
import HomeHeadNav from "../../components/HomeHeadNav";
import BottomNav from "../../components/BottomNav";
import { firebase } from "../../../Firebase/firebaseConfig";
import { appointmentStyles } from "./AppointmentStyles.js";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import DropDown from "../../components/DropDown/DropDown";

firebase.app();

const Appointments = ({ navigation }) => {

  const [doctorid, setDoctorid] = useState('');
  const [petid, setPetid] = useState('');
  const [date, setDate] = useState('');

  const [loggeduserid, setLoggeduserid] = useState(null);
  const [doctordata, setDoctordata] = useState(null);
  const [petdata, setPetdata] = useState(null);

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        // console.log(user);
        if (user) {
          // navigation.navigate('home');
          setLoggeduserid(user.uid);
        } else {
          console.log("no user");
        }
      });
    };
    checklogin();
  }, []);

  console.log(loggeduserid);

  const getDoctors = async () => {
    const docRef = await firebase.firestore().collection("UserData").where("type", "==", "doctor").get();
    console.log ("docRef: " + docRef.empty);
    docRef.onSnapshot((snapshot) => {
      setDoctordata(snapshot.docs.map((doc) => doc.data()));
    });
  };

  console.log("doctordata: " + doctordata);

  const getPets = async () => {
    const petsRef = await firebase.firestore().collection("PetData").get();
    console.log ("petsRef: " + petsRef.empty);
    petsRef.onSnapshot((snapshot) => {
      setPetdata(snapshot.docs.map((doc) => doc.data()));
    });
  };

  console.log("petdata: " + petdata);

  const handleDoctor = (e) => {
    setDoctorid(e.nativeEvent.text)
  }

  const handlePet = (e) => {
    setPetid(e.nativeEvent.text)
  }

  const handleDate = (e) => {
    setDate(e.nativeEvent.text)
  }

  const handleSubmit = () => {

    firebase.firestore()
      .collection('AppointmentData')
      .add({
        doctorid: doctorid,
        petid: petid,
        date: date,
        userid: loggeduserid
      })
      .then(() => {
        console.log('Appointment is made!');
        navigation.navigate('appointments');
      });
  }

  useEffect(() => {
    getDoctors();
    getPets();
  }, [doctorid], [petid], [loggeduserid]);

  return (
    <View style={appointmentStyles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View style={appointmentStyles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <ScrollView style={appointmentStyles.containerin}>
        {<Text style={appointmentStyles.head1}>
          {doctordata ? (
            <Text>{doctordata.Appointments}</Text>
          ) : (
            "loading"
          )}
        </Text>}

        <Text style={appointmentStyles.head1}>
          Make Appointment
        </Text>

        <TextInput variant="outlined" placeholder="Enter doctor id" style={appointmentStyles.inputContainer} onChange={handleDoctor}></TextInput>
        <Text variant='subtitle 2' style={appointmentStyles.textLableContainerLast}>Please enter doctor id</Text>
        
        <TextInput variant="outlined" placeholder="Enter pet id" style={appointmentStyles.inputContainer} onChange={handlePet}></TextInput>
        <Text variant='subtitle 2' style={appointmentStyles.textLableContainerLast}>Please enter pet id</Text>

        <TextInput variant="outlined" placeholder="Enter appointment date" style={appointmentStyles.inputContainer} onChange={handleDate}></TextInput>
        <Text variant='subtitle 2' style={appointmentStyles.textLableContainerLast}>Please enter the appointment date</Text>

        <View style={appointmentStyles.cancelbuttonContainer}>
          <Button
            title="Cancel"
            color="#B6B3B3"
            onPress={() => navigation.navigate('appointments')}
          >
          </Button>
        </View>

        <View style={appointmentStyles.editbuttonContainer}>
          <Button
            title="Submit"
            onPress={handleSubmit}
          >
          </Button>
        </View>

      </ScrollView>
    </View>
  );
};

export default Appointments;
