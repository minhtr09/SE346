import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native"; // Import Image from react-native
import { useNavigation } from "@react-navigation/native";
import Picker from "react-native-picker-select";


import styles from "./style";


const Swap = () => {
    const navigation = useNavigation();

    const [coins, setCoins] = useState({ coin1: "RON", coin2: "FLP" });
    const [coinLogo, setCoinLogo] = useState({ coin1: require("../../assets/images/ronin_logo.png"), coin2: require("../../assets/images/medal_gold.png") })
    const swapCoins = () => {
        setCoins({ coin1: coins.coin2, coin2: coins.coin1 });
        setCoinLogo({ coin1: coinLogo.coin2, coin2: coinLogo.coin1 });
        setBalance({ coin1: balance.coin2, coin2: balance.coin1 });
    }
    const [coinAmount, setCoinAmount] = useState("0.0");
    const [rates, setRates] = useState(1.5);
    const updateRates = (newRate) => {
        setRates(newRate);
    }

    const [balance, setBalance] = useState({ coin1: 100, coin2: 1000 });



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exchange</Text>
            <Text style={styles.text}>Swap your coins</Text>
            <View style={styles.rectangle}>
                <View style={styles.coinContainer}>

                    <Text
                        style={styles.header}
                    >
                        {"From :"}
                    </Text>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",

                    }}>
                        <Image
                            source={coinLogo.coin1}
                            style={styles.icon}
                        />

                        <Text style={styles.coin}>{coins.coin1}</Text>
                    </View>
                    <Text style={styles.balance}>Balance: {balance.coin1}</Text>
                </View>



                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => { setCoinAmount(text) }}
                    value={coinAmount}
                    keyboardType="numeric"
                    onFocus={() => { setCoinAmount("") }}
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
                <View style={styles.coinContainer}>
                    <Text style={styles.header}>
                        {"To :"}
                    </Text>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        <Image
                            source={coinLogo.coin2}
                            style={styles.icon}
                        />
                        <Text style={styles.coin}>{coins.coin2}</Text>
                    </View>
                    <Text style={styles.balance}>Balance: {balance.coin2}</Text>
                </View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => { setCoinAmount(text) }}
                    value={coinAmount}

                    keyboardType="numeric"
                />

            </View>
            <View style={styles.rectangle}>
                <Text style={styles.rate}>
                    {coins.coin1 === 'RON' && coins.coin2 === 'FLP' ? `1 RON = ${rates} FLP` : `1 FLP = ${1 / rates} RON`}
                </Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{"Exchange"}</Text>
            </TouchableOpacity>

        </View>
    );
};

export default Swap;
