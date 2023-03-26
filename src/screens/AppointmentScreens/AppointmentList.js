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

  const [doctordata, setDoctordata] = useState([]);
  const [doctorid, setDoctorid] = useState([]);
  const [data, setdata] = useState([]);

  const [petdata, setPetdata] = useState([]);
  const [petid, setPetid] = useState([]);
  const [pdata, setpdata] = useState([]);

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


  const [appointmentData, setAppointmentData] = useState([]);
  const [id, setID] = useState([]);

  const getDoctors = async () => {
    const docRef = await firebase.firestore().collection("UserData");

    docRef.onSnapshot((snapshot) => {
      setDoctordata(snapshot.docs.map((doc) => doc.data()));

      doctordata.map((doctor) => {
        console.log(doctor.uid);
        let DData = { 
          label: doctor.name, value: doctor.uid
        };
        console.log(DData);
        data.push(DData);
      }
      
    );
    setDoctorid(data);
    });
  };


  const getPets = async () => {
    const docRef = await firebase.firestore().collection("PetData");

    docRef.onSnapshot((snapshot) => {
      setPetdata(snapshot.docs.map((doc) => doc.data()));

      petdata.map((pet) => {
        let ItemData = { 
          label: pet.name, value: pet.petid
        };
        //console.log(ItemData);
        pdata.push(ItemData);
      }
      
    );
    setPetid(pdata);
    });
  };

  const getAppointments = async () => {
    const appointmentsRef = await firebase.firestore().collection("AppointmentData")
    appointmentsRef.onSnapshot((snapshot) => {
      setAppointmentData(snapshot.docs.map((doc) => doc.data()));
      snapshot.docs.map((doc) => doc.id)
    });
  };

  console.log("Appointment id", id);

  useEffect(() => {
    getDoctors();
    getPets();
    getAppointments();
    getuserdata();
  },[doctorid], [petid], [loggeduserid]);

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
            Hello {userdata.name}
          </Text><Text style={appointmentStyles.para}>
              You have the following appointments:
            </Text></>
        : null}


        {
          appointmentData.map((appointment, index) => {
            console.log(appointment.doctorid);
            console.log(appointment.petid);

            const doc = data.find(dt => dt.value == appointment.doctorid);
            const pet = pdata.find(dt => dt.value == appointment.petid);

            //console.log("ddata: " + doc.value)
            //console.log("pdata: " + pet.value)
           
            return (

              appointment.userid == loggeduserid ?

              <Card
              title={`${appointment.appointmentid}`}
              children={
                <View key={index}>
                  <HStack m={2} spacing={80} >
                    <View>
                      <Text style={appointmentStyles.lable}>Doctor - { doc.label }  </Text>
                      <Text style={appointmentStyles.lable}>Pet - { pet.label }</Text>
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