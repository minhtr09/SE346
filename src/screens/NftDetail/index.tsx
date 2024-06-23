import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { NftProps } from "../../type";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { State, actionCreators } from "../../redux";
import {
  getBirdAddress,
  getBirdMarketPlaceAddress,
  getFloppyAddress,
} from "../../contracts/utils/getAddress";
import {
  getBirdAbi,
  getBirdMarketPlaceAbi,
  getFloppyAbi,
} from "../../contracts/utils/getAbis";
import { useStateContext } from "../../context";
import Frame from "../../components/frame/frame";
import { parseEther } from "../../contracts/utils/parseEther";

const NFTDetail = ({ route }) => {
  const navigation = useNavigation();
  // const [textWidth, setTextWidth] = useState(0);
  // const handleTextLayout = (event: any) => {
  //   const { width } = event.nativeEvent.layout;
  //   setTextWidth(width); //Get the width of the text and update it to the state
  // };

  const nft = route?.params.data?._j;
  const id = route?.params.id;
  const price = route?.params.price;
  const nftPrice = price?.toString() as any as number;

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
  const [requestModalVisible, setRequetsModalVisible] = React.useState(false);
  const [isRequestLoading, setRequestLoading] = React.useState(false);
  const [isRequestSuccess, setRequestSisRequestSuccess] = React.useState(false);
  const [isRequestError, setRequestSisRequestError] = React.useState(false);

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

  const isShowDefaultImageBlueBird = id?.toString() === "1";
  const isShowDefaultImageRedBird = id?.toString() === "2";
  const isShowIPFSimage = id?.toString() === "0";

  const [txLoading, setTxLoading] = useState(false);

  const buttonText = () => {
    const amount = amountApproved?.toString() as any as number;
    if (txLoading && amount >= nftPrice) return "Buying...";
    else if (amount >= nftPrice) return "Buy";
    else if (txLoading && amount < nftPrice) return "Approving...";
    else return "Approve";
  };
  const buttonStyle = () => {
    if (txLoading) return styles.disabledButton;
    else return styles.button;
  };

  // Prepare contract configurations
  const { config: buyNftConfig, isSuccess: isPrepareBuyNftSuccess } =
    usePrepareContractWrite({
      address: marketPlaceAddress,
      abi: birdMarketPlaceABI,
      functionName: "buyNFT",
      args: [id?.toString()],
    });
  const {
    config: approveTokenConfig,
    isSuccess: isPrepareApproveTokenSuccess,
  } = usePrepareContractWrite({
    address: floppyAddress,
    abi: floppyABI,
    functionName: "approve",
    args: [marketPlaceAddress, price],
  });

  // Hook contract functions

  const {
    isLoading: isApproveTokenLoading,
    isSuccess: isApproveTokenSuccess,
    isError: isApproveTokenError,
    writeAsync: onApprove,
  } = useContractWrite(approveTokenConfig);
  const {
    isSuccess: isBuyNftSuccess,
    isError: isBuyNftError,
    isLoading: isBuyNftLoading,
    writeAsync: onBuyNFT,
  } = useContractWrite(buyNftConfig);

  // Hook read contract
  const { data: amountApproved, isSuccess: isCheckAmountAprrovedSuccess } =
    useContractRead({
      address: floppyAddress as any,
      abi: floppyABI,
      functionName: "allowance",
      args: [address, marketPlaceAddress],
      watch: true,
      onSuccess(data) {
        approveToken(amountApproved as number);
      },
    });

  //handle NFT actions
  const handleBuyNFT = async () => {
    console.log("Buy NFT button pressed");
    if (isCheckAmountAprrovedSuccess) {
      const amount = amountApproved?.toString() as any as number;
      console.log(amount);
      try {
        if (amount >= nftPrice) {
          console.log("Buying...");
          if (isPrepareBuyNftSuccess) {
            setTxLoading(true);
            const txHash = (await onBuyNFT?.()).hash;
            console.log(txHash);
            setTxLoading(false);
            if (txHash.toString().length > 0) {
              navigation.goBack();
            }
          }
        } else {
          // setRequetsModalVisible(true);
          console.log("Approving...");
          if (isPrepareApproveTokenSuccess) {
            setTxLoading(true);
            const txHash = (await onApprove?.()).hash;
            console.log(txHash);
            setTxLoading(false);
          }
        }
      } catch (error) {}
    }
  };

  return (
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

        <Text style={styles.title}>
          {" "}
          The Flappy Bird NFT #{(id as any)?.toString()}{" "}
        </Text>
        <View style={styles.containerPrice}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {parseFloat((price as any)?.toString()) / 1e18}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../src/assets/images/medal_gold.png")}
              style={styles.iconCoin}
            />
            <Text style={styles.unitText}>FLP</Text>
          </View>
        </View>
        {(amountApproved?.toString() as any as number) < nftPrice ? (
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
              Your current spending cap is {parseEther(amountApproved)} FLP.
              Please approve new spending cap
            </Text>
          </View>
        ) : null}
        {/* Button Place Bid Now */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={buttonStyle()}
            onPress={() => handleBuyNFT()}
            disabled={txLoading}
          >
            <Text style={styles.buttonText}>{buttonText()}</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 20,
    paddingLeft: 10,
  },
  content: {
    flex: 1,
  },
  footer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#203bc7", //cyan
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    width: "auto",
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
    backgroundColor: "#D04848",
    borderRadius: 10,
    paddingVertical: 8,
    padding: 12,
    marginTop: 30,
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "row",
    width: "auto",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
  },
  unitText: {
    color: "white",
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
    paddingHorizontal: 18,
    marginBottom: 13,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
  },
});

export default NFTDetail;
