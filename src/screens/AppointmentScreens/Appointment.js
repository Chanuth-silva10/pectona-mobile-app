import React, { useEffect, useState } from "react";
import HomeHeadNav from "../../components/HomeHeadNav";
import BottomNav from "../../components/BottomNav";
import { firebase } from "../../../Firebase/firebaseConfig";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import { petProfileStyles } from "./PetProfileStyles.js";
import { StyleSheet, StatusBar } from "react-native";

const Appointments = ({ navigation }) => {
    return (
        <View style={petProfileStyles.container}>
        <StatusBar />
        <HomeHeadNav navigation={navigation} />
        <View style={petProfileStyles.bottomnav}>
            <BottomNav navigation={navigation} />
        </View>

        <ScrollView style={petProfileStyles.containerin}>
            <Text style={petProfileStyles.head1}>
                Appointments page
            </Text>

        </ScrollView>
    </View>
    )
}

export default Appointments;