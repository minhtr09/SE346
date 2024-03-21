// Imports
// ========================================================
import { W3mButton, useWeb3Modal } from "@web3modal/wagmi-react-native";
import { StyleProp, TouchableWithoutFeedback, View, Text, TouchableOpacity } from "react-native";
import { styles } from "../../screens/Homes/Game/Start/styles";
import PLAY from "../../assets/images/play.png";


// Component
// ========================================================
export default function Connect() {

    const { open } = useWeb3Modal()
    const handleConnect = () => {
        open();
    }
    return (
        <View >
            <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
                <Text style={styles.monospaceText}>Connect Wallet</Text>
            </TouchableOpacity>
        </View>
    );
}