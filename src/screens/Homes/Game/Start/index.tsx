import { View, Image, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import React from "react";

import LOGO from "../../../../assets/images/logo.png";
import PLAY from "../../../../assets/images/play.png";
import STORE from "../../../../assets/images/store.png"

import { styles } from "./styles";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import Button from "../../../../components/Button";
import { useStateContext } from "../../../../context";
import { useNavigation } from '@react-navigation/native'

const Start = ({ handleOnStart }) => {
  const { isConnected, address } = useStateContext();
  // const navigation = useNavigation()

  const { open } = useWeb3Modal()
  const handleConnect = () => {
    open();
  }
  const { disconnect } = useDisconnect()
  const handleDisconnect = () => {
    disconnect();
  }


  return (

    (<View style={styles.container}>
      <Image source={LOGO} style={styles.logo} />
      {isConnected ? (
        <>
          <TouchableOpacity onPress={handleOnStart}>
            <Image source={PLAY} style={styles.playButton} />
          </TouchableOpacity>
          <Button text="Disconnect" onPress={disconnect} />
          {/* <TouchableOpacity onPress={()=>navigation.navigate('Store')}>
            <Image source={STORE} style={styles.playButton} />
          </TouchableOpacity> */}
        </>

      ) : (<Button text="Connect Wallet" onPress={handleConnect} />)}

    </View>)
  );
};

export { Start };