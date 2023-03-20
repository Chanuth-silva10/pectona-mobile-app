import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import HomeHeadNav from "../../components/HomeHeadNav";

import { colors } from "../../globals/style";

import BottomNav from "../../components/BottomNav";
import WalletManagementDefaultView from "./walletManagementDefaultView/WalletManagementDefaultView";

const WalletManagement = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        <WalletManagementDefaultView />
      </ScrollView>
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>
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
});
