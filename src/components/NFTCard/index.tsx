import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Text,
  Button,
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
    <View style={styles.nft}>
      {!isLoading ? (
        <>
          <Image
            source={{ uri: nft.image ?? undefined }}
            style={[styles.nftImage, { aspectRatio: 1 }]}
            resizeMode="contain"
          />
        </>
      ) : (
        <ActivityIndicator size="large" style={styles.loadingIndicator} />
      )}
      {isTransfer && (
        <Text style={styles.nftprice}>
          Cost: {parseFloat((price as any)?.toString()) / 1e18} RON
        </Text>
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
  );
};

const styles = StyleSheet.create({
  nft: {
    backgroundColor: "#eee",
    width: width * 0.45,
    marginHorizontal: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  nftprice: {
    backgroundColor: "#eee",
    width: width * 0.45,
  },
  nftImage: {
    width: "100%",
    height: undefined,
    marginBottom: 10,
    borderRadius: 6,
  },
  loadingIndicator: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "#ADD8E6", // Light blue color,
  },
  buyButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default NFTCard;
