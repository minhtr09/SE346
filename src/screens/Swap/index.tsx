import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  InputAccessoryView,
  Button,
} from "react-native"; // Import Image from react-native
import { useNavigation } from "@react-navigation/native";
import Picker from "react-native-picker-select";

import styles from "./style";
import { useBalance, useContractRead } from "wagmi";
import { useStateContext } from "../../context";
import BottomMenu from "../../components/BottomMenu/BottomMenu";

const Swap = () => {
  const {
    address,
    userTokenBalance,
  } = useStateContext();

  const navigation = useNavigation();
  const [coins, setCoins] = useState({ coin1: "RON", coin2: "FLP" });
  const [coinLogo, setCoinLogo] = useState({
    coin1: require("../../assets/images/ronin_logo.png"),
    coin2: require("../../assets/images/medal_gold.png"),
  });
  const swapCoins = () => {
    setCoins({ coin1: coins.coin2, coin2: coins.coin1 });
    setCoinLogo({ coin1: coinLogo.coin2, coin2: coinLogo.coin1 });
    setBalance({ coin1: balance.coin2, coin2: balance.coin1 });
  };
  const [coinAmount1, setCoinAmount1] = useState("0.0");
  const [coinAmount2, setCoinAmount2] = useState("0.0");
  const [rates, setRates] = useState(1000);
  const updateRates = (newRate) => {
    setRates(newRate);
  };

  const approveAmount = 0;

  const {data: ronBalance} = useBalance({
    address: address,
    watch: true,
  })

  const { data: flpBalance } = useContractRead({});

  const [balance, setBalance] = useState({ coin1: parseFloat((ronBalance?.value as any)?.toString()) / 1e18, coin2: parseFloat((userTokenBalance as any)?.toString()) / 1e18 });

  const [approved, setApproved] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <Text style={styles.title}>Exchange</Text>
      <Text style={styles.text}>Swap your coins</Text>
      <View style={styles.rectangle}>
        <View style={styles.coinContainer}>
          <Text style={styles.header}>{"You sell :"}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image source={coinLogo.coin1} style={styles.icon} />

            <Text style={styles.coin}>{coins.coin1}</Text>
          </View>
          <Text style={styles.balance}>Balance: {balance.coin1}</Text>
        </View>

        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            setCoinAmount1(text);
          }}
          value={coinAmount1}
          keyboardType="numeric"
          onFocus={() => {
            setCoinAmount1("");
          }}
          placeholder="0.0"
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
          <Text style={styles.header}>{"You buy :"}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image source={coinLogo.coin2} style={styles.icon} />
            <Text style={styles.coin}>{coins.coin2}</Text>
          </View>
          <Text style={styles.balance}>Balance: {balance.coin2}</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="0.0"
          onChangeText={(text) => {
            setCoinAmount2(text);
          }}
          value={coinAmount2}
          keyboardType="numeric"
          onFocus={() => {
            setCoinAmount2("");
          }}
        />
      </View>

      <View style={styles.rectangle}>
        <Text style={styles.rate}>
          {coins.coin1 === "RON" && coins.coin2 === "FLP"
            ? `1 RON = ${rates} FLP`
            : `1 FLP = ${1 / rates} RON`}
        </Text>
      </View>
      {!approveAmount && coins.coin1 === "FLP" ? (
        <View style={styles.approvecontainer}>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 15,
              flex: 1,
              textAlign: "left",
            }}
          >
            Approve spending cap
          </Text>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 15,
              flex: 1,
              textAlign: "left",
            }}
          >
            Your current spending cap is {approveAmount} FLP. Please approve new spending cap
          </Text>
        </View>
      ) : null}
      <TouchableOpacity
        style={
          Number(coinAmount1) > Number(balance.coin1)
            ? styles.buttonDisabled
            : styles.buttonEnabled
        }
        disabled={Number(coinAmount1) > Number(balance.coin1)}
      >
        <Text style={styles.buttonText}>
          {Number(coinAmount1) > Number(balance.coin1)
            ? "Insufficient Balance"
            : "Exchange"}
        </Text>
      </TouchableOpacity>
      <BottomMenu/>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default Swap;
