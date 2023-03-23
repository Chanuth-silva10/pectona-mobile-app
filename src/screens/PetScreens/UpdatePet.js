import { StyleSheet, StatusBar } from "react-native";

import React, { useEffect, useState } from "react";
import HomeHeadNav from "../../components/HomeHeadNav";
import BottomNav from "../../components/BottomNav";
import { firebase } from "../../../Firebase/firebaseConfig";
import { petProfileStyles } from "./PetProfileStyles.js";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import DropDown from "../../components/DropDown/DropDown";

const UpdatePets = ({ navigation, route }) => {
  const { pet } = route.params;
  console.log(route);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [dob, setDob] = useState("");
  const [spec, setSpec] = useState("");
  const [gen, setGen] = useState("");

  const [species, setSpecies] = useState([
    { label: "Dog", value: "Dog" },
    { label: "Cat", value: "Cat" },
  ]);

  const [gender, setGender] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ]);

  useEffect(() => {
    setName(pet.name);
    setBreed(pet.breed);
    setColor(pet.color);
    setSpec(pet.species);
    setDob(pet.dob);
    setGen(pet.gender);
  }, []);

  const updatePet = async () => {
    const docRef = firebase
      .firestore()
      .collection("PetData")
      .where("petid", "==", pet.petid);
    const doc = await docRef.get();
    if (!doc.empty) {
      if (name !== "") {
        doc.forEach((doc) => {
          doc.ref.update({
            name: name,
          });
        });
      }
      if (breed !== "") {
        doc.forEach((doc) => {
          doc.ref.update({
            breed: breed,
          });
        });
      }
      if (color !== "") {
        doc.forEach((doc) => {
          doc.ref.update({
            color: color,
          });
        });
      }
      alert("your pet data is updated");
    } else {
      console.log("no pet data");
    }
  };

  return (
    <View style={petProfileStyles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View style={petProfileStyles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <ScrollView style={petProfileStyles.containerin}>
        <Text style={petProfileStyles.head1}>Update Pet Profile</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          variant="outlined"
          placeholder="Whity"
          style={petProfileStyles.inputContainer}
        ></TextInput>
        <Text variant="subtitle 2" style={petProfileStyles.textLableContainer}>
          Update Pet name
        </Text>

        <DropDown
          value={spec}
          onChange={setSpec}
          data={species}
          disable={true}
        />
        <Text variant="subtitle 2" style={petProfileStyles.textLableContainer}>
          Update Pet Species
        </Text>

        <TextInput
          value={breed}
          onChangeText={setBreed}
          variant="outlined"
          placeholder="Labrador"
          style={petProfileStyles.inputContainer}
        ></TextInput>
        <Text variant="subtitle 2" style={petProfileStyles.textLableContainer}>
          Update Pet Breed
        </Text>

        <DropDown data={gender} disable={true} />
        <Text variant="subtitle 2" style={petProfileStyles.textLableContainer}>
          Update Pet Gender
        </Text>

        <TextInput
          value={color}
          onChangeText={setColor}
          variant="outlined"
          placeholder="White"
          style={petProfileStyles.inputContainer}
        ></TextInput>
        <Text variant="subtitle 2" style={petProfileStyles.textLableContainer}>
          Update Pet Color
        </Text>

        <TextInput
          value={dob}
          onChangeText={setDob}
          variant="outlined"
          placeholder="20/03/2023"
          style={petProfileStyles.inputContainer}
        ></TextInput>
        <Text
          variant="subtitle 2"
          style={petProfileStyles.textLableContainerLast}
        >
          Update Pet Date of Birth
        </Text>

        <View style={petProfileStyles.cancelbuttonContainer}>
          <Button
            title="Cancel"
            color="#B6B3B3"
            // onPress={() => navigation.navigate('PetList')}
          ></Button>
        </View>

        <View style={petProfileStyles.editbuttonContainer}>
          <Button title="Submit" onPress={() => updatePet()}></Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdatePets;
