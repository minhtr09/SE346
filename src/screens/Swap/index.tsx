import React from "react";
import { View, Text, Image } from "react-native"; // Import Image from react-native
import { useNavigation } from "@react-navigation/native";
import Picker from "react-native-picker-select";


import styles from "./style";


const Swap = () => {
    const navigation = useNavigation();
    const coins = [
        { label: "Bitcoin", value: "bitcoin",
            icon:()=><Image source={require("../assets/bitcoin.png")} style={styles.Icon} /> 
            
         },
        { label: "Ethereum", value: "ethereum", 
            icon:()=><Image source={require("../assets/ethereum.png")} style={styles.Icon} />
         },
        { label: "Litecoin", value: "litecoin" },
    ];
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exchange</Text>
            <Text style={styles.text}>Swap your coins</Text>
            <View style={styles.rectangle}>
                <Text
                    style={{
                        color: "#BDBDBD",
                        fontSize: 14,
                        marginRight: 4,
                        flex: 1,
                    }}>
                    {"From"}
                </Text>
                <Picker
                    placeholder={{}}
                    items={coins}
                    onValueChange={(value) => console.log(value)}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                />



            </View>

        </View>
    );
};
const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
};
export default Swap;
