import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    dropdown: {
      height: 57,
      width:'91%',
      margin:'5%',
      backgroundColor:'white',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    disabledPlaceholderStyle: {
      fontSize: 16,
      color: '#d3d3d3',
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    disabledSelectedTextStyle: {
      fontSize: 16,
      color: '#d3d3d3',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });