import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Users = ({
  email,
  phone,
  name,
  image,
  address,
  onPressDelete,
  onPressView,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressView}>
      <View style={styles.innerContainer}>
        <View>
          {image != null ? (
            <Image source={{ uri: image }} style={styles.userImage} />
          ) : (
            <View style={styles.ImageContainer}></View>
          )}
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{name}</Text>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoItemText}>Email: </Text>
            <Text>{email}</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoItemText}>Phone: </Text>
            <Text>{phone}</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoItemText}>Address: </Text>
            <Text>{address}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#FF4848" }]}
          onPress={onPressDelete}
        >
          <MaterialIcons name={"delete"} size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  ImageContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    height: 100,
    width: 100,
  },
  userInfoContainer: {
    paddingLeft: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
  },
  actionButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    height: 30,
    width: 30,
    backgroundColor: "#FB6831",
    borderRadius: 5,
    elevation: 2,
  },
  userInfoItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userInfoItemText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#707981",
  },
});
