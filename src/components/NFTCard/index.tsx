import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import {
  getBirdAbi,
  getBirdMarketPlaceAbi,
  getFloppyAbi,
} from "../../contracts/utils/getAbis";
import { NftProps } from "../../type";
import React from "react";
import RequestModal from "../RequestModal";
import { config } from "dotenv";
import {
  getBirdAddress,
  getBirdMarketPlaceAddress,
  getFloppyAddress,
} from "../../contracts/utils/getAddress";
import { useStateContext } from "../../context";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../redux/index";
import { useSelector } from "react-redux";
const width = Dimensions.get("window").width;

const NFTCard: React.FC<NftProps> = ({
  nft,
  isLoading,
  id,
  price,
  isTransfer,
  isList,
  onPress,
}) => {
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
  // Prepare contract configurations
  const { config: buyNftConfig } = usePrepareContractWrite({
    address: marketPlaceAddress,
    abi: birdMarketPlaceABI,
    functionName: "buyNFT",
    args: [id?.toString()],
  });
  const { config: approveTokenConfig } = usePrepareContractWrite({
    address: floppyAddress,
    abi: floppyABI,
    functionName: "approve",
    args: [marketPlaceAddress, price],
  });
  const { config: approveNftConfig } = usePrepareContractWrite({
    address: birdAddress,
    abi: birdAbi,
    functionName: "approve",
    args: [marketPlaceAddress, id?.toString()],
  });
  const { config: listNftConfig, isSuccess } = usePrepareContractWrite({
    address: marketPlaceAddress,
    abi: birdMarketPlaceABI,
    functionName: "listNft",
    args: [id?.toString(), 120000000000000],
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
    writeAsync: onBuyNFT,
  } = useContractWrite(buyNftConfig);
  const {
    isSuccess: isApproveNftSuccess,
    isError: buyApproveNftError,
    write: onApproveNft,
    isError: isApproveNftError,
    isLoading: isApproveNftLoading,
  } = useContractWrite(approveNftConfig);
  const {
    data: listData,
    isSuccess: isListNftSuccess,
    isError: isListNftError,
    isLoading: isListNftLoading,
    write: onListNFT,
  } = useContractWrite(listNftConfig);

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

  const { data: approvedAddress } = useContractRead({
    address: birdAddress as any,
    abi: birdAbi,
    functionName: "getApproved",
    args: [id?.toString()],
    watch: true,
    onSuccess(data) {
      if (approvedAddress?.toString() === marketPlaceAddress) {
        approveNft(id);
      }
    },
  });

  //handle NFT actions
  const handleBuyNFT = async () => {
    if (isCheckAmountAprrovedSuccess) {
      const amount = amountApproved?.toString() as any as number;
      const nftPrice = price?.toString() as any as number;
      console.log(state.amount, amount, nftPrice);
      try {
        if (state.amount >= nftPrice || amount >= nftPrice) {
          console.log("Buying...");
          // setRequetsModalVisible(true);
          onBuyNFT();
        } else {
          // setRequetsModalVisible(true);
          console.log("Approving...");
          onApprove();
        }
      } catch (error) {
        console.log(error);
      }
      fetchListedNfts();
    }
  };

  const handleListNFT = async () => {
    setRequetsModalVisible(true);

    console.log(approvedAddress, state[id]);
    console.log("List NFT id:", id);
    if (approvedAddress?.toString().toLowerCase() != marketPlaceAddress || state[id] === true) {
      console.log("Please approve market to transfer this NFT");
      try {
        onApproveNft();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Listing NFT......");
      try {
        onListNFT();
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserNfts();
  };


  return (
    <TouchableOpacity onPress = {onPress}>
      <View style={styles.nft}>
        {!isLoading ? (
          <>
           <View style={styles.NFTCardContainer}> 
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: nft.image ?? undefined }}
                style={[styles.nftImage, { aspectRatio: 1 }]}
                resizeMode="contain"
              />
            </View>
            <View style = {styles.textContainer }>
              {/* NFTcard name */}
            <Text style = {styles.NFTName}>THE UNKNOWN</Text> 
              {isTransfer && (
            <View style={styles.nftprice}>
              <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                {parseFloat((price as any)?.toString()) / 1e18} RON
              </Text>
            </View>   
            )}
            </View>
        </View>
          </>
        ) : (
          <ActivityIndicator size="large" style={styles.loadingIndicator} />
        )}
        {isTransfer && (
          <View style={styles.buyButton}>
            <Button
              title="Buy Now"
              onPress={() => {
                handleBuyNFT();
              }}
            />
          </View>
        )}
        {isList && (
          <View style={styles.buyButton}>
            <Button
              title="List NFT"
              onPress={() => {
                handleListNFT();
              }}
            />
          </View>
        )}       
        {/* <RequestModal
            isVisible={requestModalVisible}
            isLoading={isApproveTokenLoading || isBuyNftLoading || isApproveNftLoading}
            rpcResponse={isApproveTokenSuccess || isBuyNftSuccess || isApproveNftSuccess ? "Success" : undefined}
            rpcError={isApproveTokenError || isBuyNftError || isApproveNftError ? 'Something Wrong Happened' : undefined}
            onClose={() => setRequetsModalVisible(false)}
        /> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nft: {
    backgroundColor: "#eee",
    width: width * 0.75,
    marginHorizontal: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  NFTCardContainer: {
    flexDirection: 'row', // Arrange items horizontally
  },
  NFTName: {
    color: 'Black', 
    fontWeight: 'bold',
    textAlign: 'auto',
    fontSize: 16,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  nftprice: {
    backgroundColor: '#612FB1',
    borderRadius: 30, 
    width: width * 0.3,
    marginLeft: 10,
    maxWidth: 200,
  },
  nftImage: {
    width: "100%",
    height: 100,
    borderRadius: 6,
  },
  loadingIndicator: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "#11C0CB", // cyan color,
  },
  text: {
    color: 'white', 
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
  },
  imageContainer: {
    alignSelf: 'flex-start', // Align image to the left
    margin: 10,
    borderRadius: 6,
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 2, 
  },
  buyButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default NFTCard;
