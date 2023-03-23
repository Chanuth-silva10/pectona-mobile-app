import { StyleSheet, StatusBar, TouchableOpacity } from "react-native";

import React, { useEffect, useState } from "react";
import HomeHeadNav from "../../components/HomeHeadNav";
import BottomNav from "../../components/BottomNav";
import { firebase } from "../../../Firebase/firebaseConfig";
import { petProfileStyles } from "./PetProfileStyles.js";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import DropDown from "../../components/DropDown/DropDown";

const UpdatePets = ({ navigation, route }) => {

    const { pet } = route.params;
    console.log("route",route);

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [color, setColor] = useState('');
    const [dob, setDob] = useState('');
    const [spec, setSpec] = useState('');
    const [gen, setGen] = useState('');

    const [species, setSpecies] = useState([
        { label: 'Dog', value: 'Dog' },
        { label: 'Cat', value: 'Cat' },
    ]);

    const [gender, setGender] = useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
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
            if (dob !== "") {
                doc.forEach((doc) => {
                    doc.ref.update({
                        dob: dob,
                    });
                });
            }
            if (spec !== "") {
                doc.forEach((doc) => {
                    doc.ref.update({
                        spec: spec,
                    });
                });
            }
            if (gen !== "") {
                doc.forEach((doc) => {
                    doc.ref.update({
                        gen: gen,
                    });
                });
            }
            alert("your pet data is updated");
            navigation.navigate('pets');
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
                <Text style={petProfileStyles.head1}>
                    Update Pet Profile
                </Text>

                <TextInput variant="outlined" placeholder={name} style={petProfileStyles.inputContainer} value={name} onChangeText={setName}></TextInput>
                <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Update Pet name</Text>

                <DropDown data={species} disable={true} value={spec} onChange={setSpec} />
                <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Update Pet Species</Text>

                <TextInput variant="outlined" placeholder={breed} style={petProfileStyles.inputContainer} value={breed} onChangeText={setBreed}></TextInput>
                <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Update Pet Breed</Text>

                <DropDown data={gender} disable={true} setValue={setGen} value={gen} onChange={setGen} />
                <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Update Pet Gender</Text>

                <TextInput variant="outlined" placeholder={color} style={petProfileStyles.inputContainer} value={color} onChangeText={setColor}></TextInput>
                <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Update Pet Color</Text>

                <TextInput variant="outlined" placeholder={dob} style={petProfileStyles.inputContainer} value={dob} onChangeText={setDob}></TextInput>
                <Text variant='subtitle 2' style={petProfileStyles.textLableContainerLast}>Update Pet Date of Birth</Text>

                <View style={petProfileStyles.cancelbuttonContainer}>
                    <TouchableOpacity style={petProfileStyles.cancelbtn} onPress={() => navigation.navigate('pets')}>
                        <Text style={petProfileStyles.btntxt}>Cancel</Text>
                    </TouchableOpacity>
                </View>

                <View style={petProfileStyles.editbuttonContainer}>
                    <TouchableOpacity style={petProfileStyles.sumitbtn}  onPress={() => updatePet()}>
                        <Text style={petProfileStyles.btntxt}>Submit</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

export default UpdatePets;
