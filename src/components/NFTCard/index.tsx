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
import NFTCElement from "../NFTCard_Element/NFTC_Element";
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
  const isShowDefaultImageBlueBird = id?.toString() === "1";
  const isShowDefaultImageRedBird = id?.toString() === "2";
  const isShowIPFSimage = id?.toString() === "0";

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.nft}>
        {!isLoading ? (
          <>
            <View style={styles.NFTCardContainer}>
        
              <View style={styles.imageContainer}>
                {isShowIPFSimage && (
                  <Image
                    source={require("../../assets/images/yellowbird-midflap.png")}
                    style={[styles.nftImage, { aspectRatio: 1 }]}
                    resizeMode="contain"
                  />
                )}
                {isShowDefaultImageBlueBird && (
                  <Image
                    source={require("../../assets/images/bluebird-midflap.png")}
                    style={[styles.nftImage, { aspectRatio: 1 }]}
                    resizeMode="contain"
                  />
                )}
                {isShowDefaultImageRedBird && (
                  <Image
                    source={require("../../assets/images/redbird-midflap.png")}
                    style={[styles.nftImage, { aspectRatio: 1 }]}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View style={styles.nftcElementContainer}>
                <NFTCElement />
              </View>

              <View style={styles.textContainer}>
                {/* NFTcard name */}
                <Text style={styles.NFTName}>
                  The Flappy Bird NFT #{(id as any)?.toString()}
                </Text>
                {isTransfer && (
                  <View style={styles.nftprice}>
                     <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        }}>
                       <Text
                            style={styles.text}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            >
                              {parseFloat((price as any)?.toString()) / 1e18} {" "}
                            </Text>
                          <Image
                            source={require('../../../src/assets/images/medal_gold.png')}
                            style={styles.iconCoin}
                          />
                    </View>                   
                  </View>
                )}
              </View>
            </View>
          </>
        ) : (
          <ActivityIndicator size="large" style={styles.loadingIndicator} />
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
    // backgroundColor: "#eee",
    width: width * 0.75,
    marginHorizontal: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  NFTCardContainer: {
    flexDirection: "row", // Arrange items horizontally
  },
  NFTName: {
    color: "Black",
    fontWeight: "bold",
    textAlign: "auto",
    fontSize: 16,
    marginBottom: 10,
  },
  textContainer: {
    backgroundColor: "#eee",
    flex: 1,
    marginTop: 8,
    marginBottom:8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    justifyContent: "center",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  nftprice: {
    backgroundColor: "#612FB1",
    borderRadius: 30,
    width: width * 0.3,
    maxWidth: 200,
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "300",
    marginLeft: 10,
  },
  imageContainer: {
    position: "absolute",
    marginLeft: 10,
    marginTop:10,
    zIndex: 1, 
    alignItems: "flex-start",
  },
  nftcElementContainer: {
    zIndex: 0, 
  },
  iconCoin :{
    width: 24,
    height: 24,
    marginLeft: 5,
  },
});

export default NFTCard;
