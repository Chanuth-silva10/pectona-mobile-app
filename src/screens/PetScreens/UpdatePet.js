import { StyleSheet, StatusBar } from "react-native";

import React, { useEffect, useState } from "react";
import HomeHeadNav from "../../components/HomeHeadNav";
import BottomNav from "../../components/BottomNav";
import { firebase } from "../../../Firebase/firebaseConfig";
import { petProfileStyles } from "./PetProfileStyles.js";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import DropDown from "../../components/DropDown/DropDown";

const UpdatePets = ({ navigation }) => {

    const [species, setSpecies] = useState([
        { label: 'Dog', value: 'Dog' },
        { label: 'Cat', value: 'Cat' },
    ]);

    const [gender, setGender] = useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ]);

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

                <TextInput variant="outlined" placeholder="Whity" style={petProfileStyles.inputContainer}></TextInput>
                <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Update Pet name</Text>

                <DropDown data={species} disable={true} />
                <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Update Pet Species</Text>

                <TextInput variant="outlined" placeholder="Labrador" style={petProfileStyles.inputContainer}></TextInput>
                <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Update Pet Breed</Text>

                <DropDown data={gender} disable={true} />
                <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Update Pet Gender</Text>

                <TextInput variant="outlined" placeholder="White" style={petProfileStyles.inputContainer}></TextInput>
                <Text variant='subtitle 2' style={petProfileStyles.textLableContainer}>Update Pet Color</Text>

                <TextInput variant="outlined" placeholder="20/03/2023" style={petProfileStyles.inputContainer}></TextInput>
                <Text variant='subtitle 2' style={petProfileStyles.textLableContainerLast}>Update Pet Date of Birth</Text>

                <View style={petProfileStyles.cancelbuttonContainer}>
                    <Button
                        title="Cancel"
                        color="#B6B3B3"
                    // onPress={() => navigation.navigate('PetList')}
                    >
                    </Button>
                </View>

                <View style={petProfileStyles.editbuttonContainer}>
                    <Button
                        title="Submit"
                    // onPress={handleSubmit}
                    >
                    </Button>
                </View>

            </ScrollView>
        </View>
    );
};

export default UpdatePets;
