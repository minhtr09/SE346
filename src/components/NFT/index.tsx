import { Dimensions, View, StyleSheet, Image, ActivityIndicator, Text, Button } from "react-native";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { getBirdAbi, getBirdMarketPlaceAbi, getFloppyAbi } from "../../contracts/utils/getAbis";
import { NftProps } from "../../../type";
import React from "react";
import RequestModal from "../RequestModal";
import { config } from "dotenv";
import { getBirdAddress, getBirdMarketPlaceAddress, getFloppyAddress } from "../../contracts/utils/getAddress";



const width = Dimensions.get('window').width;

const NFTCard: React.FC<NftProps> = ({ nft, isLoading, id, price, isTransfer, isList }) => {
    const { address } = useAccount();
    const [requestModalVisible, setRequetsModalVisible] = React.useState(false);
    const [isRequestLoading, setRequestLoading] = React.useState(false);
    const [isRequestSuccess, setRequestSisRequestSuccess] = React.useState(false);
    const [isRequestError, setRequestSisRequestError] = React.useState(false);


    //contracts address, abi
    const marketPlaceAddress = getBirdMarketPlaceAddress();
    const birdAddress = getBirdAddress();
    const birdAbi = getBirdAbi()
    const floppyAddress = getFloppyAddress()
    const floppyABI = getFloppyAbi();
    const birdMarketPlaceABI = getBirdMarketPlaceAbi();
    // Prepare contract configurations
    const { config: buyNftConfig, } = usePrepareContractWrite({
        address: marketPlaceAddress,
        abi: birdMarketPlaceABI,
        functionName: 'buyNFT',
        args: [id.toString()],

    })
    const { config: approveTokenConfig } = usePrepareContractWrite({
        address: floppyAddress,
        abi: floppyABI,
        functionName: 'approve',
        args: [marketPlaceAddress, price],
    })
    const { config: approveNftConfig } = usePrepareContractWrite({
        address: birdAddress,
        abi: birdAbi,
        functionName: 'approve',
        args: [marketPlaceAddress, id.toString()],

    })
    const { config: listNftConfig, isSuccess } = usePrepareContractWrite({
        address: marketPlaceAddress,
        abi: birdMarketPlaceABI,
        functionName: 'listNft',
        args: [id.toString(), 12000],

    })
    // Hook contract functions

    const { data, isLoading: isApproveTokenLoading, isSuccess: isApproveTokenSuccess, isError: isApproveTokenError, write: onApprove } = useContractWrite(approveTokenConfig)
    const { data: buyData, isSuccess: isBuyNftSuccess, isError: isBuyNftError, isLoading: isBuyNftLoading, write: onBuyNFT } = useContractWrite(buyNftConfig)
    const { isSuccess: isApproveNftSuccess, isError: buyApproveNftError, write: onApproveNft, isError: isApproveNftError, isLoading: isApproveNftLoading } = useContractWrite(approveNftConfig)
    const { data: listData, isSuccess: isListNftSuccess, isError: isListNftError, isLoading: isListNftLoading, write: onListNFT } = useContractWrite(listNftConfig)

    // Hook read contract
    const { data: amountApproved, isSuccess: isCheckAmountAprrovedSuccess } = useContractRead({
        address: floppyAddress,
        abi: floppyABI,
        functionName: 'allowance',
        args: [address, marketPlaceAddress]
    });
    const { data: approvedAddress } = useContractRead({
        address: birdAddress,
        abi: birdAbi,
        functionName: "getApproved",
        args: [id.toString()],
    });





    //handle NFT actions
    const handleBuyNFT = async () => {
        if (isCheckAmountAprrovedSuccess) {
            const amount = (amountApproved.toString() as any) as number;
            console.log("amount: ", amount?.toString(), price)
            if (amount >= price) {
                try {
                    console.log("Buying...")
                    setRequetsModalVisible(true);
                    onBuyNFT();
                } catch (error) {
                    console.log(error);
                }
            }
            else {
                try {
                    setRequetsModalVisible(true);
                    console.log("Approving...")
                    onApprove();
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
    const handleListNFT = async () => {
        console.log(approvedAddress, id)
        setRequetsModalVisible(true);
        if (approvedAddress != marketPlaceAddress) {
            console.log("Please approve market to transfer this NFT")
            try {
                onApproveNft()
            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log("Listing NFT......")
            try {
                onListNFT()
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <View style={styles.nft}>
            {
                !isLoading ? (
                    <>
                        <Image source={{ uri: nft.image ?? undefined }}
                            style={[styles.nftImage, { aspectRatio: 1 }]}
                            resizeMode="contain"
                        />
                    </>
                ) : (<ActivityIndicator size="large" style={styles.loadingIndicator} />)
            }
            {
                isTransfer && <Text style={styles.nftprice}>
                    Cost: {price}
                </Text>
            }
            {
                isTransfer &&
                <View style={styles.buyButton}>
                    <Button title="Buy Now" onPress={() => handleBuyNFT()} />
                </View>
            }
            {
                isList &&
                <View style={styles.buyButton}>
                    <Button title="List NFT" onPress={() => handleListNFT()} />
                </View>
            }
            <RequestModal
                isVisible={requestModalVisible}
                isLoading={isApproveTokenLoading || isBuyNftLoading || isApproveNftLoading}
                rpcResponse={isApproveTokenSuccess || isBuyNftSuccess || isApproveNftSuccess ? "Success" : undefined}
                rpcError={isApproveTokenError || isBuyNftError || isApproveNftError ? 'Something Wrong Happened' : undefined}
                onClose={() => setRequetsModalVisible(false)}
            />
        </View >

    )
}

const styles = StyleSheet.create({

    nft: {
        backgroundColor: "#eee",
        width: width * 0.45,
        marginHorizontal: 10,
        borderRadius: 8,
        justifyContent: 'center'
    }, nftprice: {
        backgroundColor: "#eee",
        width: width * 0.45
    },
    nftImage: {
        width: "100%",
        height: undefined,
        marginBottom: 10,
        borderRadius: 6,
    },
    loadingIndicator: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ADD8E6', // Light blue color,
    },
    buyButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    }

})

export default NFTCard
