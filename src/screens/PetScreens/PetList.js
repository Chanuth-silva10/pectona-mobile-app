import { StyleSheet, StatusBar } from "react-native";

import React, { useEffect, useState } from "react";
import HomeHeadNav from "../../components/HomeHeadNav";
import BottomNav from "../../components/BottomNav";
import { firebase } from "../../../Firebase/firebaseConfig";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import { petProfileStyles } from "./PetProfileStyles.js";
import Card from "../../components/Card/Card";
import { HStack, Provider} from '@react-native-material/core';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const PetList = ({ navigation }) => {
    return (

        <View style={petProfileStyles.container}>
            <StatusBar />
            <HomeHeadNav navigation={navigation} />
            <View style={petProfileStyles.bottomnav}>
                <BottomNav navigation={navigation} />
            </View>

            <ScrollView style={petProfileStyles.containerin}>
                <Text style={petProfileStyles.head1}>
                    Pet List
                </Text>

                {/* Dog Example */}
                <Card
                    title="Whity the Dog"
                    children={
                        <View >
                            <HStack m={2} spacing={80} >
                                <View>
                                    <Text style={petProfileStyles.lable}>Breed - Labrador</Text>
                                    <Text style={petProfileStyles.lable}>Gender - Female</Text>
                                    <Text style={petProfileStyles.lable}>Color - White</Text>
                                    <Text style={petProfileStyles.lable}>Age - 03</Text>
                                </View>
                                <View style={petProfileStyles.iconContainer}>
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

                {/* Cat Example */}

                <Card
                    title="Kitty the Cat"
                    children={
                        <View >
                            <HStack m={2} spacing={80} >
                                <View>
                                    <Text style={petProfileStyles.lable}>Breed - British Shorthair</Text>
                                    <Text style={petProfileStyles.lable}>Gender - Male</Text>
                                    <Text style={petProfileStyles.lable}>Color - Grey</Text>
                                    <Text style={petProfileStyles.lable}>Age - 05</Text>
                                </View>
                                <View style={petProfileStyles.iconContainer}>
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

            </ScrollView>
        </View>
    );
}

export default PetList;