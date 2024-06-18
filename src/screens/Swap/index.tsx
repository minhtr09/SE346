import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native"; // Import Image from react-native
import { useNavigation } from "@react-navigation/native";
import Picker from "react-native-picker-select";


import styles from "./style";


const Swap = () => {
    const navigation = useNavigation();

    const [coins, setCoins] = useState({ coin1: "RON", coin2: "FLP" });
    const swapCoins = () => {
        setCoins({ coin1: coins.coin2, coin2: coins.coin1 });
    }
    const [coinAmount, setCoinAmount] = useState("0.0");


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
                    }}>
                    {"From :"}
                </Text>
                <Text style={styles.coin}>{coins.coin1}</Text>


                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => { setCoinAmount(text) }}
                    value={coinAmount}
                    placeholder="0.0"
                    keyboardType="numeric"
                />

            </View>
            <TouchableOpacity
                onPress={() => {
                    swapCoins();

                }}
            >
                <Image
                    source={require("../../assets/images/swap.png")}
                    style={{ width: 50, height: 50, marginBottom: 24, marginTop: 24 }}
                />
            </TouchableOpacity>

            <View style={styles.rectangle}>
                <Text
                    style={{
                        color: "#BDBDBD",
                        fontSize: 14,
                        marginRight: 4,
                     
                    }}>
                    {"To :"}
                </Text>
                <Text style={styles.coin}>{coins.coin2}</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => { setCoinAmount(text) }}
                    value={coinAmount}
                    placeholder="0.0"
                    keyboardType="numeric"
                />

            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{"Exchange"}</Text>

            </TouchableOpacity>

        </View>
    );
};

export default Swap;
