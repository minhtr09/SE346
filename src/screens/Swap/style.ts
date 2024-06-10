import { Icon } from "ionicons/dist/types/components/icon/icon";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#202020',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 84,
        paddingBottom: 118,
    },
    title:{
        color: "#FEFEFE",
			fontSize: 22,
			marginBottom: 7,
			marginLeft: 26,

    },
    text:{
        color: "#DADADA",
			fontSize: 14,
			marginBottom: 24,
			marginLeft: 25,
    },
    rectangle:{
        flexDirection: "row",
		borderColor: "#767676",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 16,
		paddingHorizontal: 18,
		marginBottom: 13,
		marginHorizontal: 24,
        justifyContent: "space-between",
    },
    Icon:{
        width: 24,
        height: 24,}
        
    

    

    


});
export default styles;