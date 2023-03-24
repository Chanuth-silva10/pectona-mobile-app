import { View, Text, StyleSheet } from "react-native";
import Lottie from "lottie-react-native";
import { Pressable } from "react-native";
import AddCardModal from "../addCardModal/AddCardModal";

const WalletManagementDefaultView = ({
  isOpen,
  setIsOpen,
  getData,
  setIsLoading,
}) => {
  return (
    <>
      <View style={styles.container}>
        <Lottie
          source={require("../../../../assets/animation/no-data.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.notifyText}>No Credit card found!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.addNewButton} onPress={() => setIsOpen(true)}>
          <Text style={styles.notifyText}>Add New Card</Text>
        </Pressable>
        <AddCardModal
          type={"add"}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          getData={getData}
          setIsLoading={setIsLoading}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textContainer: {
    backgroundColor: "white",
  },
  notifyText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: 500,
  },
  lottie: {
    width: "100%",
    height: "100%",
    marginTop: 40,
  },
  addNewButton: {
    backgroundColor: "white",
    borderColor: "purple",
    borderWidth: 2,
    width: 200,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 500,
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WalletManagementDefaultView;
