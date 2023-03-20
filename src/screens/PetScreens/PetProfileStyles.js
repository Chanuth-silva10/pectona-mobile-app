import { StyleSheet } from "react-native"
import { colors } from "../../globals/style";

export const petProfileStyles = StyleSheet.create({
    inputContainer: {
        height: 50,
        width: '91%',
        margin: '5%',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
    },
    inputContainerUpdateProfile: {
        height: 50,
        width: '91%',
        margin: '5%',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
    },
    inputContainerDropDown: {
        height: 50,
        width: '91%',
        margin: '5%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
    },
    textLableContainer: {
        marginLeft: '5%',
        marginTop: '-3%',
        fontSize: 14,
        lineHeight: 16,
        font: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '500',
        color: 'rgba(0, 0, 0, 0.6)'
    },
    userImageContainer: {
        width: 150,
        height: 150,
        marginLeft: 90,
        marginRight: 90,
        marginTop: 20,
        borderRadius: 150,
        marginBottom: 20,
    },
    textLableContainerLast: {
        marginLeft: '5%',
        marginTop: '-3%',
        fontSize: 12,
        lineHeight: 16,
        font: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '500',
        color: 'rgba(0, 0, 0, 0.6)',
        marginBottom: 30
    },
    buttonContainer: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelbuttonContainer: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
    },
    editbuttonContainer: {
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 40
    },
    iconContainer: {
        marginLeft: 50,
    },
    buttonTextContent: {
        marginLeft: 10,
        fontSize: 18,
        color: "#ffffff",
        marginRight: 50,
        font: 'Roboto',
    },
    cancelbuttonTextContent: {
        marginLeft: 80,
        fontSize: 18,
        color: "#000000",
        marginRight: 80,
        font: 'Roboto',
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
    },
    bottomnav: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: colors.mtg,
        zIndex: 20,
    },
    containerin: {
        marginTop: 10,
        flex: 1,
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        marginBottom: 100,
    },
    head1: {
        fontSize: 30,
        color: colors.mtg,
        textAlign: "center",
        marginVertical: 20,
    },
    icon:{
        position:'absolute',
        top:560,
        left:"80%",
        color: '#1658CD',
        boxShadow:'-8px 4px 24px rgba(0, 0, 0, 0.25)'
    },
    lable:{
        font: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#000000',
        padding:2
    },
    message:{
        position:'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    reminderWrapper:{
        position:"absolute", 
        width:'100%', 
        height:"100%"
    },
    iconContainer: {
        position: "absolute",
        right: 10
    }
})
