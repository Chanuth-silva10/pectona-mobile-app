import {
  Text,
  Modal,
  View,
  Pressable,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../../../../Firebase/firebaseConfig";
import { useState } from "react";

const AddCardModal = ({ isOpen, onClose, getData, setIsLoading }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvn, setCVN] = useState("");
  const saveWallet = async () => {
    setIsLoading(true);
    const db = firebase.firestore().collection("CardWallet");
    const cardToSave = {
      id: new Date(),
      cardType: "debit",
      cardNumber: cardNumber,
      expiryMonth: expiryMonth,
      expiryYear: expiryYear,
      cvn: cvn,
    };
    onClose();
    await db
      .add(cardToSave)
      .then(() => {
        getData();
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
      onRequestClose={onClose}
      style={styles.modalContainer}
    >
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.topContainer}>
            <Pressable onPress={onClose}>
              <AntDesign name="left" size={25} color="black" />
            </Pressable>
            <Text style={styles.header}>Add New Card</Text>
          </View>
          <View style={styles.topicContainer}>
            <Text style={styles.topic}>Payment Details</Text>
          </View>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.fieldHeader}>Card Number</Text>
              <TextInput
                placeholder="Card Number"
                style={styles.cardNumberInput}
                keyboardType={"numeric"}
                maxLength={8}
                onChangeText={(value) => setCardNumber(value)}
              />
            </View>
            <View style={styles.expiryContainer}>
              <View>
                <Text style={styles.fieldHeader}>Expiry Month</Text>
                <TextInput
                  placeholder="Expiry Month"
                  style={styles.expiryDate}
                  keyboardType={"numeric"}
                  maxLength={2}
                  onChangeText={(value) => setExpiryMonth(value)}
                />
              </View>
              <View>
                <Text style={styles.fieldHeader}>Expiry Year</Text>
                <TextInput
                  placeholder="Expiry Year"
                  style={styles.expiryDate}
                  keyboardType={"numeric"}
                  maxLength={4}
                  onChangeText={(value) => setExpiryYear(value)}
                />
              </View>
            </View>
            <View>
              <Text style={styles.fieldHeader}>CVN</Text>
              <Text style={styles.fieldDescription}>
                This code is a three or four digit number printed on the back or
                front of credit cards.
              </Text>
              <TextInput
                placeholder="CVN"
                style={styles.cvn}
                keyboardType={"numeric"}
                maxLength={4}
                onChangeText={(value) => setCVN(value)}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Pressable onPress={saveWallet} style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: Dimensions.get("window").height,
  },
  topContainer: {
    flexDirection: "row",
    width: "70%",
    padding: 10,
    textAlign: "center",
    justifyContent: "space-between",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  topicContainer: {
    width: "100%",
    padding: 10,
    borderBottomColor: "purple",
    borderTopColor: "purple",
    borderBottomWidth: 1,
    borderTopWidth: 1,

    marginTop: 10,
  },
  topic: {
    fontSize: 18,
    color: "purple",
  },
  cardNumberInput: {
    width: Dimensions.get("screen").width - 30,
    height: 57,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  expiryDate: {
    width: 150,
    borderColor: "gray",
    height: 57,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  cvn: {
    width: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  expiryContainer: {
    flexDirection: "row",
    gap: 20,
  },
  buttonContainer: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    position: "absolute",
    bottom: 40,
  },
  mainContainer: {
    height: Dimensions.get("window").height,
  },

  contentContainer: {
    paddingHorizontal: 10,
  },
  cancelButton: {
    borderColor: "red",
    borderWidth: 2,
    width: 100,
    padding: 20,
    borderRadius: 16,
  },
  submitButton: {
    borderColor: "purple",
    width: 100,
    borderWidth: 2,
    padding: 20,
    borderRadius: 16,
  },
  cancelText: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },
  submitText: {
    textAlign: "center",
    color: "purple",
    fontWeight: "bold",
  },
  fieldHeader: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
  fieldDescription: {
    color: "gray",
    fontStyle: "italic",
    marginVertical: 5,
    marginLeft: 5,
  },
});

export default AddCardModal;
