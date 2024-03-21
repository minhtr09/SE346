import { View, Image, TouchableWithoutFeedback, Text } from "react-native";

import LOGO from "../../../../assets/images/logo.png";
import PLAY from "../../../../assets/images/play.png";
import React, { useState, useEffect, useCallback } from "react";
import { Web3Modal } from '@web3modal/wagmi-react-native'

import { styles } from "./styles";
import Connect from "../../../../components/Connect";
import { useAccount, useBalance } from "wagmi";
import { ReadContract } from "../../../../components/ReadContract";
import { WriteContract } from "../../../../components/WriteContract";

const Start = ({ handleOnStartGame }) => {
    // Hooks
    const { isConnected, address } = useAccount();
    const { data, isError, isLoading } = useBalance({
        address
    });


    return (
        <View style={styles.container}>
            <Image source={LOGO} style={styles.logo} />
            {/* {!connector.connected && account === "NOT CONNECTED" ? (
                <TouchableWithoutFeedback onPress={connectWallet}>
                    <Image source={PLAY} style={styles.playButton} />
                </TouchableWithoutFeedback>
            ) : (
                <TouchableWithoutFeedback onPress={handleOnStartGame}>
                    <Image source={PLAY} style={styles.playButton} />
                </TouchableWithoutFeedback>
            )} */}
            {
                !isConnected &&
                <Connect />

            }
            <ReadContract />
            <WriteContract />
        </View>
    );
};

export { Start };
