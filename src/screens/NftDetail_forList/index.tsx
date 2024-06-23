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

const NFTDetailList = ({ route }) => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState("");
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
      args: [id?.toString(), 120000000000000],
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
    
      } catch (error) {
      }
    } else {
      console.log("Listing NFT......");
      try {
        setTxLoading(true);
        const txHash = (await onListNFT?.()).hash;
        console.log(txHash);
        setTxLoading(false);
        if(txHash.toString().length > 0) {
          navigation.goBack();
        }
      } catch (error) {
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderBackButton onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.content}>
        {/* <Text style={styles.title}>NFT Details</Text> */}
        {/* <Text>ID: {id}</Text>
            <Text>Price: {price}</Text> */}
        {/* <Image source={{ uri: nft.image ?? undefined }} style={styles.image}/> */}
        <Image
          source={require("../../assets/images/item.png")}
          style={styles.image}
        />

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
            placeholder="Price"
            keyboardType="numeric"
            value={inputValue}
            onChangeText={setInputValue}
            maxLength={10}
          />
          <Text style={styles.unitText}>FLP</Text>
        </View>

        <Text style={styles.title}> The Unkown </Text>
      </View>

      {/* Group icons */}
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={handleFavorite} style={styles.iconButton}>
          <Image
            source={require("../../assets/icons/favorite.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
          <Image
            source={require("../../assets/icons/share.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAdd} style={styles.iconButton}>
          <Image
            source={require("../../assets/icons/more.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Button Place Bid Now */}
      <View>
        {txLoading ? (
          <TouchableOpacity style={styles.disabledButton} disabled={true}>
            <Text style={styles.buttonText}>Listing...</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleListNFT()}
            disabled={false}
          >
            <Text style={styles.buttonText}>List Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#11C0CB", //cyan
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#99dde0",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
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
  iconRow: {
    position: "absolute",
    marginTop: 415,
    marginLeft: 110,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  iconButton: {
    padding: 15,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },

  containerPrice: {
    backgroundColor: "#808080",
    borderRadius: 30,
    paddingVertical: 8,
    padding: 12,
    marginLeft: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "black",
    textAlign: "center",
    fontSize: 14,
    flex: 1,
  },
  unitText: {
    color: "Black",
    fontSize: 14,
    marginLeft: 5,
  },
});

export default NFTDetailList;
