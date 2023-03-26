import { StyleSheet, StatusBar, TouchableOpacity } from "react-native";

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
  const [doctordata, setDoctordata] = useState([]);
  const [petdata, setPetdata] = useState([]);

  const [data, setdata] = useState([]);
  const [pdata, setpdata] = useState([]);

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
    const docRef = firebase.firestore().collection("UserData")
    docRef.onSnapshot((snapshot) => {
      setDoctordata(snapshot.docs.map((doc) => doc.data()));

      doctordata.map((doctor) => {
        let DData = { 
          label: doctor.name, value: doctor.uid
        };
        data.push(DData);
      });
    });
    
  };

  console.log("doctorname: " + doctordata.map((doctor, index) => {return (doctor.name)}));

  const getPets = async () => {
    const petsRef = firebase.firestore().collection("PetData");
    petsRef.onSnapshot((snapshot) => {
      setPetdata(snapshot.docs.map((doc) => doc.data()));

      petdata.map((pet) => {
        let ItemData = { 
          label: pet.name, value: pet.petid
        };
        pdata.push(ItemData);
      });
    });

  };

  console.log("petname: " + petdata.map((pet, index) => {return (pet.name)}));

  const handleDoctor = (e) => {
    setDoctorid(e.nativeEvent.text)
  }

  const handlePet = (e) => {
    console.log("selectedpetid :" + selectedpetid);
    setPetid(e.nativeEvent.text)
  }

  const handleDate = (e) => {
    setDate(e.nativeEvent.text)
  }

  const handleSubmit = () => {

    firebase.firestore()
      .collection('AppointmentData')
      .add({
        appointmentid: Math.floor(Math.random() * 100) + 1,
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
        
        <Text style={appointmentStyles.head1}>
          Make an Appointment
        </Text>
        
        <DropDown data={data} disable={true} onChange={handleDoctor} setValue={setDoctorid} />
        <Text variant='subtitle 2' style={appointmentStyles.textLableContainer}>Please select a doctor</Text>

        <DropDown data={pdata} disable={true} onChange={handlePet} setValue={setPetid} />
        <Text variant='subtitle 2' style={appointmentStyles.textLableContainer}>Please select a pet</Text>

        <TextInput variant="outlined" placeholder="Enter appointment date" style={appointmentStyles.inputContainer} onChange={handleDate}></TextInput>
        <Text variant='subtitle 2' style={appointmentStyles.textLableContainer}>Please enter the appointment date</Text>

        <View style={appointmentStyles.cancelbuttonContainer}>
          <TouchableOpacity style={appointmentStyles.cancelbtn} onPress={() => navigation.navigate('appointments')}>
            <Text style={appointmentStyles.btntxt}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={appointmentStyles.editbuttonContainer}>
          <TouchableOpacity style={appointmentStyles.sumitbtn} onPress={handleSubmit}>
            <Text style={appointmentStyles.btntxt}>Submit</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default Appointments;
