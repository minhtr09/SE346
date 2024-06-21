import React from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
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
} from "wagmi";
import { styles } from "./styles";
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

const Store: React.FC = () => {
  const {
    isConnected,
    address,
    listedNfts,
    userTokenBalance,
    fetchListedNfts,
    userNfts,
    fetchUserNfts,
    tokenIdsOwnedByUser,
  } = useStateContext();

  const birdAddress = getBirdAddress();
  const birdABI = getBirdAbi();

  const floppyAddress = getFloppyAddress();
  const floppyABI = getFloppyAbi();

  const marketPlaceAddress = getBirdMarketPlaceAddress();
  const birdMarketPlaceABI = getBirdMarketPlaceAbi();

  const dispatch = useDispatch();
  const { setListedNfts, setUserNfts } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const state = useSelector((state: State) => state.fetch);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    fetchListedNfts();
    fetchUserNfts();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const { data: marketBalance } = useContractRead({
    address: birdAddress as any, // Bird address
    abi: birdABI,
    functionName: "balanceOf",
    args: [marketPlaceAddress as any],
    enabled: true,
    watch: true,
  });

  const { data: userNftBalance } = useContractRead({
    address: birdAddress as any, // Bird address
    abi: birdABI,
    functionName: "balanceOf",
    args: [marketPlaceAddress as any],
    enabled: true,
    watch: true,
  });

  const { data: nfts } = useContractRead({
    address: marketPlaceAddress as any,
    abi: birdMarketPlaceABI,
    functionName: "getListedNfts",
    enabled: true,
  });

  React.useEffect(() => {
    console.log("UI Realoading...");
    fetchListedNfts();
    fetchUserNfts();
  }, [marketBalance, userNftBalance]);

  const navigation = useNavigation<NavigationProp<any>>();
  const handleCardPress = (nft: any, index: number) => {
    
    navigation.navigate("NftDetail", { data: nft, id: nfts[index]?.tokenId, price: nfts[index]?.price as any});
  };

  const handleDetailListPress = (nft: any) => {
    
    navigation.navigate("NftDetailList", { data: nft  });
  };

  return (
    <>
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.connectedView}>
          <View style={styles.card}>
            <Text>
              FLP Balances:{" "}
              {parseFloat((userTokenBalance as any)?.toString()) / 1e18}
            </Text>
          </View>
          <View style={styles.card}>
            <Text>NFT for sells:</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 20 }}
            >
              {state.listedNfts && state.listedNfts.length > 0 ? (
                state.listedNfts?.map((nft, index) => {
                  return (
                    <NFTCard
                      key={index}
                      nft={nft?._j}
                      isLoading={false}
                      id={nfts[index]?.tokenId}
                      price={nfts[index]?.price as any}
                      isTransfer={true}
                      isList={false}
                      onPress={() => handleCardPress(nft,index)}
                    />
                  );
                })
              ) : (
                <Text>No Collectibles</Text>
              )}
            </ScrollView>
          </View>
          <View style={styles.card}>
            <Text>Your NFT:</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 20 }}
            >
              {state?.userNfts && state?.userNfts.length > 0 ? (
                state?.userNfts?.map((nft, index) => {
              
                  return (
                    <NFTCard
                      key={index}
                      nft={nft?.tokenUrl?._j}
                      isLoading={false}
                      id={nft?.tokenId}
                      price={1200000}
                      isTransfer={false}
                      isList={true}
                      onPress={() => handleDetailListPress(nft)}
                    />
                  );
                })
              ) : (
                <Text>No Collectibles</Text>
              )}
            </ScrollView>
          </View>
          {/* <Button text="Disconnect Wallet" onPress={()=>{}} /> */}
          {/* <WriteContract /> */}
          {/* refreshing ={} */}
        </View>
      </ScrollView>
      <BottomMenu />
    </>
  );
};

export { Store };
