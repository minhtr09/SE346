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

const NFTDetail = ({ route }) => {
  const navigation = useNavigation();
  const [textWidth, setTextWidth] = useState(0);
  const handleTextLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setTextWidth(width); //Get the width of the text and update it to the state
  };
  

  const nft = route?.params.data?._j;
  const id = route?.params.id;
  const price = route?.params.price;

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

  // Prepare contract configurations
  const { config: buyNftConfig, isSuccess: isPrepareBuyNftSuccess } =
    usePrepareContractWrite({
      address: marketPlaceAddress,
      abi: birdMarketPlaceABI,
      functionName: "buyNFT",
      args: [id?.toString()],
      onError(err) {
        console.error("Prepare BuyNFT error:",err);
      },
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
    data,
    isLoading: isApproveTokenLoading,
    isSuccess: isApproveTokenSuccess,
    isError: isApproveTokenError,
    writeAsync: onApprove,
  } = useContractWrite(approveTokenConfig);
  const {
    isSuccess: isBuyNftSuccess,
    isError: isBuyNftError,
    isLoading: isBuyNftLoading,
    write: onBuyNFT,
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
      const nftPrice = price?.toString() as any as number;
      console.log(state.amount, amount, nftPrice);
      try {
        if (state.amount >= nftPrice || amount >= nftPrice) {
          console.log("Buying...");
          console.log(isPrepareBuyNftSuccess)
          if (isPrepareBuyNftSuccess) {
            onBuyNFT();
          }
        } else {
          // setRequetsModalVisible(true);
          console.log("Approving...");
          if (isPrepareApproveTokenSuccess) {
            onApprove();
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderBackButton onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/item.png")}
          style={styles.image}
        />
        {isShowDefaultImageBlueBird && (
            <Image
            source={require("../../assets/images/bluebird-midflap.png")}
            style={styles.overlayImage}
          />
        )
        }
        {isShowDefaultImageRedBird && (
            <Image
            source={require("../../assets/images/redbird-midflap.png")}
            style={styles.overlayImage}
          />
        )
        }
        {isShowIPFSimage && (
          <Image
          source={{ uri: nft.image ?? undefined }}
          style={styles.overlayImage}
          />
        )}
        
        <Text style={styles.title}>
          {" "}
          The Flappy Bird NFT #{(id as any).toString()}{" "}
        </Text>
        <View style={[styles.containerPrice, { width: textWidth + 50 }]}>
          <Text
            style={styles.text}
            onLayout={handleTextLayout}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {parseFloat((price as any)?.toString()) / 1e18} FLP
          </Text>
        </View>
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
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => handleBuyNFT()}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
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
    marginBottom: 16,
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
    backgroundColor: "#612FB1", //light purple
    borderRadius: 30,
    paddingVertical: 8,
    padding: 12,
    marginTop: 16,
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
  },
});

export default NFTDetail;
