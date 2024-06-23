import { Icon } from "ionicons/dist/types/components/icon/icon";
import { Dimensions, StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#202020',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopLeftRadius: 24,
        // borderTopRightRadius: 24,
        paddingTop: 84,
        paddingBottom: 200,
    },
    title: {
        color: "#FEFEFE",
        fontSize: 30,
        marginBottom: 7,
        marginLeft: 25,
        fontWeight: 'bold',

    },
    text: {
        color: "#DADADA",
        fontSize: 14,
        marginBottom: 24,
        marginLeft: 25,
    },
    rectangle: {
        flexDirection: "row",
        borderColor: "#767676",
        borderRadius: 8,
        borderWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 13,
        marginHorizontal: 24,
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonEnabled: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#89B9FF",
        borderRadius: 8,
        paddingVertical: 13,
        paddingHorizontal: 24,
        marginHorizontal: 24,
        width: "auto",
    },
    buttonDisabled: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        borderRadius: 8,
        paddingVertical: 13,
        paddingHorizontal: 24,
        marginHorizontal: 24,
        width: "auto",
    },
    coin: {
        color: "#FFFFFF",
        fontSize: 16,
        marginRight: 4,
        marginLeft: 4,

    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 20,
        flex: 1,
        textAlign: "center",
    },
    textInput: {
        color: "#FFFFFF",
        fontSize: 20,

    },
    textInputError: {
        color: "red",
        fontSize: 20,

    },
    header:{
        color: "#BDBDBD",
        fontSize: 14,
        marginRight: 4,
    },
    icon :{
        width: 24,
        height: 24,
    },
    rate:{
        color: "#FFFFFF",
        fontSize: 16,
        marginRight: 4,
        flex: 1,
        marginLeft: 4,
        textAlign: "center",
    },
    balance: {
        color: "#FFFFFF",
        fontSize: 14,
        marginRight: 4,
    },
    coinContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    approvecontainer:{
        flexDirection: "row",
        backgroundColor:"#04252F",
        borderRadius: 8,
        borderWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 13,
        marginHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
    
    },
    accessory: {
        width: Dimensions.get('window').width,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 8
      }



});
export default styles;