import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import HomeHeadNav from "../../components/HomeHeadNav";

import { colors } from "../../globals/style";
import Lottie from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import AddCardModal from "./addCardModal/AddCardModal";

import BottomNav from "../../components/BottomNav";
import WalletManagementDefaultView from "./walletManagementDefaultView/WalletManagementDefaultView";
import { useState, useEffect } from "react";
import { firebase } from "../../../Firebase/firebaseConfig";
import Loader from "../../components/Loader/Loader";
import { FlatList, Text } from "react-native";
import { Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EditCardModal from "./editCardModal/EditCardModal";
import { Alert } from "react-native";

const WalletManagement = ({ navigation }) => {
  const [walletData, setWalletData] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [item, setItem] = useState(false);

  const getData = async () => {
    const data = await firebase.firestore().collection("CardWallet").get();
    let cardDataArray = [];
    if (data && !data.empty) {
      data.docs.forEach((doc) => {
        let cardData = doc.data();
        cardData.id = doc.id;
        cardDataArray.push(cardData);
      });
    }
    setWalletData(cardDataArray);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [isLoading]);

  const renderToDoItem = ({ item }) => {
    return (
      <View style={styles.card} key={item.id}>
        <Pressable
          onPress={() => {
            setIsEditOpen(true);
            setItem(item);
          }}
          style={styles.editSection}
        >
          <Lottie
            source={require("../../../assets/animation/creditCard.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
          <View style={styles.textContainer}>
            <Text style={styles.cardText}>{item.cardNumber}</Text>
            <Text style={styles.cardText}>Card Type : {item.cardType}</Text>
            <Text style={styles.cardText}>
              Expiry Month : {item.expiryMonth}
            </Text>
            <Text style={styles.cardText}>Expiry Year : {item.expiryYear}</Text>
            <Text style={styles.cardText}>CVN : {item.cvn}</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => deleteCardConfirmation(item.id)}>
          <MaterialIcons name="delete" size={30} />
        </Pressable>
      </View>
    );
  };

  const deleteCardConfirmation = async (deleteID) => {
    return Alert.alert("Confirmation required", "Delete card?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          deleteCard(deleteID);
        },
      },
    ]);
  };

  const deleteCard = async (deleteID) => {
    setIsLoading(true);
    const doc = await firebase
      .firestore()
      .collection("CardWallet")
      .doc(deleteID);
    doc.delete().then(() => {
      getData();
      setIsLoading(false);
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      {!walletData.length ? (
        <ScrollView style={styles.scrollView}>
          <WalletManagementDefaultView
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            getData={getData}
            setIsLoading={setIsLoading}
          />
        </ScrollView>
      ) : (
        <FlatList
          data={walletData}
          refreshing={isLoading}
          onRefresh={() => {
            setIsLoading(true);
          }}
          renderItem={renderToDoItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
      )}
      {walletData.length ? (
        <Pressable
          style={({ pressed }) => (pressed ? styles.pressed : styles.addButton)}
          onPress={() => setIsOpen(true)}
        >
          <AntDesign
            name="plus"
            size={50}
            color="white"
            style={styles.addIcon}
          />
        </Pressable>
      ) : null}
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>
      <AddCardModal
        type={"add"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        getData={getData}
        setIsLoading={setIsLoading}
      />
      <EditCardModal
        item={item}
        type={"edit"}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        getData={getData}
        setIsLoading={setIsLoading}
      />
    </View>
  );
};

export default WalletManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomnav: {
    width: "100%",
    backgroundColor: colors.mtg,
    zIndex: 20,
  },
  scrollView: {
    height: "100%",
  },

  card: {
    backgroundColor: "#e6eeff",
    margin: 10,
    padding: 20,
    height: 150,
    borderRadius: 16,
    flexDirection: "row",
    gap: 40,
    shadowColor: "purple",
  },
  editSection: {
    flexDirection: "row",
    gap: 50,
  },
  cardText: { fontSize: 15, fontWeight: 600 },
  lottie: {
    width: 70,
    height: 70,
    marginTop: 10,
  },
  addButton: {
    height: 60,
    width: 60,
    borderRadius: 40,
    backgroundColor: colors.mtg,
    position: "absolute",
    right: 10,
    bottom: 80,
  },
  pressed: {
    height: 60,
    width: 60,
    borderRadius: 40,
    backgroundColor: colors.mtg,
    position: "absolute",
    right: 10,
    bottom: 80,
    opacity: 0.5,
  },
  addIcon: {
    marginLeft: 5,
    marginTop: 5,
  },
  flatList: {
    backgroundColor: "white",
  },
});
