import { View, Image, TouchableWithoutFeedback, Text, TouchableOpacity, ScrollView } from "react-native";

import LOGO from "../../../../assets/images/logo.png";
import PLAY from "../../../../assets/images/play.png";
import { Web3Modal, useWeb3Modal } from '@web3modal/wagmi-react-native'
import { styles } from "./styles";
import Connect from "../../../../components/Button";
import { useAccount, useBalance, useContractRead, useDisconnect, useContractReads } from "wagmi";
import { ReadContract } from "../../../../components/ReadContract";
import { WriteContract } from "../../../../components/WriteContract";
import StoreButton from "../../../../components/StoreButton";
import Button from "../../../../components/Button";
import { getBirdAbi, getBirdMarketPlaceAbi, getFloppyAbi } from "../../../../contracts/utils/getAbis";
import React from "react";
import NFTCard from "../../../../components/NFT";
import { ListedNFT, NftData, NftProps } from "../../../../../type";
import { getBirdAddress, getBirdMarketPlaceAddress } from "../../../../contracts/utils/getAddress";


export default function Start() {

  const birdAddress = getBirdAddress()
  const birdABI = getBirdAbi()
  const marketPlaceAddress = getBirdMarketPlaceAddress();
  const birdMarketPlaceABI = getBirdMarketPlaceAbi();
  const { isConnected, address } = useAccount();
  const [listedNfts, setListedNfts] = React.useState<NftData[]>([]);
  const [userNfts, setUserNfts] = React.useState<NftData[]>([]);

  const { open } = useWeb3Modal()
  const handleConnect = () => {
    open();
  }
  const { disconnect } = useDisconnect()
  const handleDisconnect = () => {
    disconnect();
  }



  // Prepare contract configurations
  const birdContract = {
    address: birdAddress,
    abi: birdABI
  }

  const listedNftsUrisContractsConfig = () => {
    const contracts = [];
    (listedNFTsId as ListedNFT[])?.map((nft) => {
      const contract = { ...birdContract, functionName: 'tokenURI', args: [nft?.tokenId] }
      contracts.push(contract);
    })

    return contracts;
  }
  const userNftsContractsConfig = (userBalance: any) => {
    const contracts = [];
    userBalance = userBalance?.toString() as number;

    for (let i = 0; i < userBalance; i++) {

      const contract = { ...birdContract, functionName: 'tokenOfOwnerByIndex', args: [address, i] }
      contracts.push(contract);
    }
    return contracts;
  }
  const userNftsUrisContractsConfig = () => {
    const contracts = [];
    allUserTokenId?.map((tokenId) => {
      const contract = { ...birdContract, functionName: 'tokenURI', args: [tokenId?.result.toString()] }
      contracts.push(contract);
    })

    return contracts;
  }

  //Hook read contract
  const { data: listedNFTsId } = useContractRead({
    address: marketPlaceAddress, // Bird Market Place address
    abi: birdMarketPlaceABI,
    functionName: 'getListedNfts',
    enabled: true, onSuccess(data) {
      console.log('Success', data)
    },
  });

  const { data: userBalance } = useContractRead({
    address: birdAddress, // Bird address
    abi: birdABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: true, onSuccess(data) {
      console.log('Success', data)
    },
  });


  //get all listed NFTs in market place
  const { data: listedNftsTokenURIs, isLoading: isListedNftsLoading, isSuccess: isListedNftsSuccess } = useContractReads({
    contracts:
      listedNftsUrisContractsConfig(),
  })

  //get user's nfts
  const { data: allUserTokenId } = useContractReads({
    contracts:
      userNftsContractsConfig(userBalance),
  })

  const { data: userNftsTokenURIs, isLoading: isUserNftsLoading, isSuccess: isFetchUserNftsSuccess } = useContractReads({
    contracts:
      userNftsUrisContractsConfig(),
  })



  const fetchListedNfts = async () => {
    try {
      const nftPromises = listedNftsTokenURIs?.map(async (uri) => {
        const nftData = await fetch(uri?.result.toString());
        const json = await nftData.json(); // Assuming response is JSON
        return json
      });

      // 7. Set NFTs after all data is fetched
      const fetchedListedNfts = await Promise.all(nftPromises);
      setListedNfts(fetchedListedNfts);
    } catch (error) {

    }
  }
  React.useEffect(() => {
    fetchListedNfts();
  }, [listedNFTsId, listedNfts]);

  const fetchUserNfts = async () => {
    try {
      const nftPromises = userNftsTokenURIs?.map(async (uri) => {
        const nftData = await fetch(uri?.result.toString());
        const json = await nftData.json(); // Assuming response is JSON
        return json
      });

      // 7. Set NFTs after all data is fetched
      const fetchedUserNfts = await Promise.all(nftPromises);
      setUserNfts(fetchedUserNfts);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      // Handle fetching errors appropriately (e.g., display error message)
    }
  };
  React.useEffect(() => {
    fetchUserNfts();
  }, [userBalance, userNfts]);


  return (
    <>
      {isConnected ? (<View style={styles.connectedView}>
        <View style={styles.card}>
          <Text>
            NFT for sells:
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
            {isListedNftsSuccess && listedNfts && listedNfts.length > 0 ? (listedNfts?.map((nft, index) => {
              return <NFTCard nft={nft} isLoading={isListedNftsLoading} id={listedNFTsId[index]?.tokenId} price={listedNFTsId[index]?.price.toString() as number} isTransfer={true} isList={false} />
            })) : (
              <Text>No Collectibles</Text>
            )}
          </ScrollView>
        </View>
        <View style={styles.card}>
          <Text>
            Owned NFT:
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {isFetchUserNftsSuccess && userNfts && userNfts.length > 0 ? (userNfts?.map((nft, index) => {
              return <NFTCard nft={nft} isLoading={isUserNftsLoading} id={allUserTokenId[index]?.result as number} price={0} isTransfer={false} isList={true} />
            })) : (
              <Text>No Collectibles</Text>
            )}
          </ScrollView>

        </View>
        {/* <Button text="Disconnect Wallet" onPress={handleDisconnect} /> */}
        <ReadContract />

      </View>) : (<View style={styles.container}>

        <Image source={LOGO} style={styles.logo} />

        <TouchableOpacity>
          <Image source={PLAY} style={styles.playButton} />
        </TouchableOpacity>
        <StoreButton />
        {
          !isConnected &&
          <Button text="Connect Wallet" onPress={handleConnect} />
        }
      </View>)}


    </>

  );
};

