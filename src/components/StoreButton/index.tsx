// Imports
// ========================================================
import { W3mButton, useWeb3Modal } from "@web3modal/wagmi-react-native";
import { StyleProp, TouchableWithoutFeedback, View, Text, TouchableOpacity } from "react-native";
import { styles } from "../../screens/Homes/Game/Start/styles";
import PLAY from "../../assets/images/play.png";


// Component
// ========================================================
export default function StoreButton() {


    return (
        <View >
            <TouchableOpacity style={styles.connectButton} >
                <Text style={styles.monospaceText}>Store</Text>
            </TouchableOpacity>
        </View>
    );
}