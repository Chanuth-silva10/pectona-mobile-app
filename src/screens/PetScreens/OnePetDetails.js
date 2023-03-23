import { StatusBar } from "react-native";

import React, { useEffect, useState } from "react";
import HomeHeadNav from "../../components/HomeHeadNav";
import BottomNav from "../../components/BottomNav";
import { petProfileStyles } from "./PetProfileStyles.js";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'

const OnePetDetails = ({ navigation, route }) => {
    const { pet } = route.params;
    console.log("OnePetDetails route", route);

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [color, setColor] = useState('');
    const [dob, setDob] = useState('');
    const [spec, setSpec] = useState('');
    const [gen, setGen] = useState('');

    useEffect(() => {
        setName(pet.name);
        setBreed(pet.breed);
        setColor(pet.color);
        setSpec(pet.species);
        setDob(pet.dob);
        setGen(pet.gender);
    }, []);

    return (
        <View style={petProfileStyles.container}>
            <StatusBar />
            <HomeHeadNav navigation={navigation} />

            <View style={petProfileStyles.bottomnav}>
                <BottomNav navigation={navigation} />
            </View>

            <Ionicons
                name="arrow-back"
                size={40}
                onPress={() => navigation.navigate("pets")}
                style={petProfileStyles.backArrow}
            />

            <ScrollView style={petProfileStyles.containerin}>

                <Text style={petProfileStyles.onePetDetailHead}>
                    Name - {name}
                </Text>

                <Text style={petProfileStyles.onePetDetailHead}>
                    Species - {spec}
                </Text>

                <Text style={petProfileStyles.onePetDetailHead}>
                    Breed - {breed}
                </Text>

                <Text style={petProfileStyles.onePetDetailHead}>
                    Gender - {gen}
                </Text>

                <Text style={petProfileStyles.onePetDetailHead}>
                    Color - {color}
                </Text>

                <Text style={petProfileStyles.onePetDetailHead}>
                    Date Of Birth - {dob}
                </Text>
            </ScrollView>

        </View>
    );
}

export default OnePetDetails;