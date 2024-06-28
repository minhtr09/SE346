import React, { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ListedNFT, NftData } from "../../type";
import {
  getBirdAbi,
  getBirdMarketPlaceAbi,
  getFloppyAbi,
} from "../../contracts/utils/getAbis";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import {
  getBirdAddress,
  getBirdMarketPlaceAddress,
  getFloppyAddress,
} from "../../contracts/utils/getAddress";
// import { WriteContract } from '../../components/WriteContract';

import { bscTestnet } from "wagmi/chains";
import NFTCard from "../../components/NFTCard";
import ICOCard from "../../components/ICOCard";
import { WriteContract } from "../../components/WriteContract";
import Button from "../../components/Button";
import { useStateContext } from "../../context";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { State, actionCreators } from "../../redux";
import { useSelector } from "react-redux";
import BottomMenu from "../../components/BottomMenu/BottomMenu";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";
import Frame from "../../components/frame/frame";
import { toGwei } from "../../contracts/utils/parseEther";
import { changeBirdColor } from "../../redux/action-creators";
import { Alert } from "react-native";

const NFTDetailList = ({ route }) => {
  const navigation = useNavigation();
  const [nftPrice, setNftPrice] = useState("");
  const id = route?.params.data?.tokenId;
  const nft = route?.params.data?.tokenUrl?._j;

  const isShowDefaultImageBlueBird = id?.toString() === "1";
  const isShowDefaultImageRedBird = id?.toString() === "2";
  const isShowIPFSimage = id?.toString() === "0";

  const handlePlaceBid = () => {
    console.log("Place Bid Now button pressed");
  };

  const handleFavorite = () => {
    console.log("Favorite button pressed");
  };
  const handleShare = () => {
    console.log("Share button pressed");
  };
  const handleAdd = () => {
    console.log("Add button pressed");
  };

  const { address } = useAccount();
  const { fetchListedNfts, fetchUserNfts } = useStateContext();
  const [txLoading, setTxLoading] = useState(false);

  const dispatch = useDispatch();
  const { approveNft, approveToken } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const state = useSelector((state: State) => state.approve);
  //
  const handleBirdColorChange = () => {
    let color = "default";
    if (isShowDefaultImageBlueBird) color = "blue";
    if (isShowDefaultImageRedBird) color = "red";
    if (isShowIPFSimage) color = "yellow";
    
    dispatch(changeBirdColor(color) as any);
    Alert.alert(
      "Bird Color Changed",
      "Your bird skin has been changed to this NFT",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]
    )
  }




  //contracts address, abi
  const marketPlaceAddress = getBirdMarketPlaceAddress();
  const birdAddress = getBirdAddress();
  const birdAbi = getBirdAbi();
  const floppyAddress = getFloppyAddress();
  const floppyABI = getFloppyAbi();
  const birdMarketPlaceABI = getBirdMarketPlaceAbi();
  // Prepare contract configurations
  const { config: approveNftConfig, isSuccess: isPrepareApproveNftSuccess } =
    usePrepareContractWrite({
      address: birdAddress,
      abi: birdAbi,
      functionName: "approve",
      args: [marketPlaceAddress, id?.toString()],
    });
  const { config: listNftConfig, isSuccess: isPrepareListNftSuccess } =
    usePrepareContractWrite({
      address: marketPlaceAddress,
      abi: birdMarketPlaceABI,
      functionName: "listNft",
      args: [id?.toString(), toGwei(nftPrice)],
    });
  // Hook contract functions

  const {
    isSuccess: isApproveNftSuccess,
    isError: buyApproveNftError,
    writeAsync: onApproveNft,
    isError: isApproveNftError,
    isLoading: isApproveNftLoading,
  } = useContractWrite(approveNftConfig);
  const {
    data: listData,
    isSuccess: isListNftSuccess,
    isError: isListNftError,
    isLoading: isListNftLoading,
    writeAsync: onListNFT,
  } = useContractWrite(listNftConfig);

  // Hook read contract

  const { data: approvedAddress } = useContractRead({
    address: birdAddress as any,
    abi: birdAbi,
    functionName: "getApproved",
    args: [id?.toString()],
    watch: true,
  });

  const buttonStyle = () => {
    if (txLoading) return styles.disabledButton;
    else return styles.button;
  };

  const buttonText = () => {
    if (txLoading && approvedAddress?.toString().toLowerCase() != marketPlaceAddress) return "Approving...";
    else if(approvedAddress?.toString().toLowerCase() != marketPlaceAddress) return "Approve";
    else if(txLoading && approvedAddress?.toString().toLowerCase() == marketPlaceAddress) return "Listing..."
    else return "List Now";
  };

  //handle NFT actions
  const handleListNFT = async () => {
    console.log("List NFT id:", id);
    if (approvedAddress?.toString().toLowerCase() != marketPlaceAddress) {
      console.log("Please approve market to transfer this NFT");
      try {
        setTxLoading(true);
        const txHash = (await onApproveNft?.()).hash;
        console.log(txHash);
        setTxLoading(false);
      } catch (error) {}
    } else {
      console.log("Listing NFT......");
      try {
        setTxLoading(true);
        const txHash = (await onListNFT?.()).hash;
        console.log(txHash);
        setTxLoading(false);
        if (txHash.toString().length > 0) {
          navigation.goBack();
        }
      } catch (error) {}
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderBackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.content}>
          <Frame />
          {isShowDefaultImageBlueBird && (
            <Image
              source={require("../../assets/images/bluebird-midflap.png")}
              style={styles.overlayImage}
            />
          )}
          {isShowDefaultImageRedBird && (
            <Image
              source={require("../../assets/images/redbird-midflap.png")}
              style={styles.overlayImage}
            />
          )}
          {isShowIPFSimage && (
            <Image
              source={require("../../assets/images/yellowbird-midflap.png")}
              style={styles.overlayImage}
            />
          )}

          <View style={styles.containerPrice}>
            <TextInput
              style={styles.text}
              numberOfLines={1}
              placeholder="0.0"
              keyboardType="numeric"
              value={nftPrice}
              onChangeText={setNftPrice}
              maxLength={10}
              editable = {approvedAddress?.toString().toLowerCase() == marketPlaceAddress}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../src/assets/images/medal_gold.png")}
                style={styles.iconCoin}
              />
              <Text style={styles.unitText}>FLP</Text>
            </View>
          </View>
          <Text style={styles.title}> The Flappy Bird NFT #{id.toString()} </Text>
          {approvedAddress?.toString().toLowerCase() != marketPlaceAddress ? (
                        <View style={styles.approvecontainer}>
                        <Image
                          source={require('../../assets/icons/warning.png')}
                          style ={{
                            width: 20,
                            height: 20,
                          }}  
                        />
                        <View style = {{
                          flexDirection: "column",
                          marginLeft: 10,
                        }}>
                          <Text
                            style={{
                              color: "#FFFFFF",
                              fontSize: 15,
                              textAlign: "left",
                              marginBottom: 10,
                              fontWeight: "600"
                            }}
                          >
                            Approve transfering the NFT
                          </Text>
                          <Text
                            style={{
                              color: "#FFFFFF",
                              fontSize: 15,
                              textAlign: "left",
                              fontWeight: "200"
                            }}
                          >
                            This NFT cannot be listed for transfer on the market yet. Please approve it first.
                          </Text>
                        </View>
                      </View>
          ) : null}
          {/* select skin button */}
          <TouchableOpacity style={styles.button} 
          onPress={() => handleBirdColorChange()}
          >
            <Text style={styles.buttonText}>Select Skin</Text>
          </TouchableOpacity>
          

          {/* Button to list now */}
          <View>
            <TouchableOpacity
              style={buttonStyle()}
              onPress={() => handleListNFT()}
              disabled = {txLoading}
            >
              <Text style={styles.buttonText}>{buttonText()}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  image: {
    width: 373,
    height: 453,
    resizeMode: "contain",
    justifyContent: "center",
  },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#203bc7", //cyan
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#5a84d1",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  overlayImage: {
    position: "absolute",
    marginTop: 200,
    marginLeft: 175,
    width: 100,
    height: 100,
    resizeMode: "contain",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },

  containerPrice: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#808080",
    // paddingVertical: 8,
    padding: 10,
    marginTop: 30,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    flex: 1,
  },
  unitText: {
    color: "Black",
    fontSize: 14,
    marginLeft: 5,
  },
  iconCoin: {
    width: 24,
    height: 24,
  },
  approvecontainer: {
    flexDirection: "row",
    backgroundColor: "#04252F",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 5,
    marginBottom: 13,
    marginTop: 15,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 100,
  },
});

export default NFTDetailList;
