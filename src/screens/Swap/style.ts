import { Icon } from "ionicons/dist/types/components/icon/icon";
import { Dimensions, StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
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
        color: "black",
        fontSize: 30,
        marginBottom: 24,
        marginLeft: 25,
        fontWeight: 'bold',
    },
    rectangle: {
        flexDirection: "row",
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 13,
        marginHorizontal: 24,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#eee",
        shadowColor: "#eee",
    },
    buttonEnabled: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#203bc7",
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
        backgroundColor: "#7f9ddb",
        borderRadius: 8,
        paddingVertical: 13,
        paddingHorizontal: 24,
        marginHorizontal: 24,
        width: "auto",
    },
    buttonLoading: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5a84d1",
        borderRadius: 8,
        paddingVertical: 13,
        paddingHorizontal: 24,
        marginHorizontal: 24,
        width: "auto",
    },
    buttonError: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eb2121",
        borderRadius: 8,
        paddingVertical: 13,
        paddingHorizontal: 24,
        marginHorizontal: 24,
        width: "auto",
    },
    
    coin: {
        color: "black",
        fontSize: 16,
        marginRight: 4,
        marginLeft: 4,
        fontWeight: "bold",

    },
    buttonText: {
        color: "white",
        fontSize: 20,
        flex: 1,
        textAlign: "center",
    },
    textInput: {
        color: "black",
        fontSize: 20,
        fontWeight: 'bold'
    },
    textInputError: {
        color: "red",
        fontSize: 20,

    },
    header:{
        color: "#42444d",
        fontSize: 14,
        marginRight: 4,
    },
    icon :{
        width: 24,
        height: 24,
    },
    rate:{
        color: "black",
        fontSize: 16,
        marginRight: 4,
        flex: 1,
        marginLeft: 4,
        textAlign: "center",
    },
    balance: {
        color: "#42444d",
        fontSize: 14,
        marginRight: 4,
    },
    coinContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    approvecontainer:{
        flexDirection: "row",
        backgroundColor: "#04252F",
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 16,
        paddingBottom: 5,
        marginBottom: 13,
        marginTop: 15,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        height: 100,
        marginHorizontal: 23
    
    },
    accessory: {
        width: Dimensions.get('window').width,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 8
    },
    coinWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        borderRadius: 8,
        padding: 8,
        backgroundColor:'#E2E5EC',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
       
    },
 
});
export default styles;