import { View, Image, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native'
import LOGO from "../../../../assets/images/logo.png";
import PLAY from "../../../../assets/images/play.png";
import MESSAGE from "../../../../assets/images/message.png";

import { styles } from "./styles";


const projectId = '4e178defe3ed3ce84ed2b0c72f38aca8'
const project_name = '4e178defe3ed3ce84ed2b0c72f38aca8'


const providerMetadata = {
    name: project_name,
    description: 'YOUR_PROJECT_DESCRIPTION',
    url: 'https://your-project-website.com/',
    icons: ['https://your-project-logo.com/'],
    redirect: {
        native: 'YOUR_APP_SCHEME://',
        universal: 'YOUR_APP_UNIVERSAL_LINK.com'
    }
}


const Start = ({ handleOnStartGame }) => {
    const [isGameOver, setIsGameOver] = useState(false);
    const { isOpen, open, close, provider, isConnected, address } = useWalletConnectModal();
    const handleWalletConnectButton = async () => {
        if (isConnected) {
            return provider?.disconnect();
        }
        return open();
    }


    return (
        <View style={styles.container}>
            <Image source={MESSAGE} style={styles.logo} />
            {isConnected ? (
                <TouchableWithoutFeedback onPress={handleOnStartGame}>
                    <Image source={PLAY} style={styles.playButton} />
                </TouchableWithoutFeedback>
            ) : (
                <TouchableOpacity style={styles.connectButton} onPress={handleWalletConnectButton}>
                    <Text style={styles.monospaceText}>Connect Wallet</Text>
                </TouchableOpacity>
            )}

            <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />

        </View>
    );
};

export { Start };