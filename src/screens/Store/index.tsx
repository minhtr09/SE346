import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ListedNFT, NftData } from '../../type';
import { getBirdAbi, getBirdMarketPlaceAbi, getFloppyAbi } from '../../contracts/utils/getAbis';
import { useAccount, useBalance, useContractRead, useContractReads } from 'wagmi';
import { styles } from './styles';
import { getBirdAddress, getBirdMarketPlaceAddress, getFloppyAddress } from '../../contracts/utils/getAddress';
// import { WriteContract } from '../../components/WriteContract';
import { bscTestnet } from 'wagmi/chains'
import NFTCard from '../../components/NFTCard';
import ICOCard from '../../components/ICOCard';

const Store: React.FC = () => {
  const { isConnected, address } = useAccount();

  const birdAddress = getBirdAddress();
  const birdABI = getBirdAbi()
  const floppyAddress = getFloppyAddress();
  const floppyABI = getFloppyAbi();

  const marketPlaceAddress = getBirdMarketPlaceAddress();
  const birdMarketPlaceABI = getBirdMarketPlaceAbi();
  const [listedNfts, setListedNfts] = React.useState<NftData[]>([]);
  const [isLoadingListedNfts, setLoadingListedNfts] = React.useState(false);
  const [userNfts, setUserNfts] = React.useState<NftData[]>([]);

  // const result = useBalance({
  //   address: address,
  //   chainId: bscTestnet.id, onSuccess(data) {

  //   },
  // })

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

  //  
  // }
  // const userNftsContractsConfig = (userBalance: any) => {
  //   const contracts = [];
  //   userBalance = userBalance?.toString() as number;

  //   for (let i = 0; i < userBalance; i++) {

  //     const contract = { ...birdContract, functionName: 'tokenOfOwnerByIndex', args: [address, i] }
  //     contracts.push(contract);
  //   }
  //   return contracts;
  // }
  // const userNftsUrisContractsConfig = () => {
  //   const contracts = [];
  //   allUserTokenId?.map((tokenId) => {
  //     const contract = { ...birdContract, functionName: 'tokenURI', args: [tokenId?.result.toString()] }
  //     contracts.push(contract);
  //   })

  //   return contracts;
  // }

  //Hook read contract
  const { data: listedNFTsId } = useContractRead({
    address: marketPlaceAddress as any, // Bird Market Place address
    abi: birdMarketPlaceABI,
    functionName: 'getListedNfts',
    enabled: true, onSuccess(data) {
    },
  });

  // const { data: userBalance } = useContractRead({
  //   address: birdAddress, // Bird address
  //   abi: birdABI,
  //   functionName: 'balanceOf',
  //   args: [address],
  //   enabled: true, onSuccess(data) {
  //     console.log('Success', data)
  //   },
  // });
  const { data: userTokenBalance } = useContractRead({
    address: floppyAddress as any, // Bird address
    abi: floppyABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: true, onSuccess(data) {
    },
  });


  //get all listed NFTs in market place
  const { data: listedNftsTokenURIs, isLoading, isSuccess: isListedNftsSuccess } = useContractReads({
    contracts:
      listedNftsUrisContractsConfig()
  })
  // console.log(listedNftsTokenURIs);
  // //get user's nfts
  // const { data: allUserTokenId } = useContractReads({
  //   contracts:
  //     userNftsContractsConfig(userBalance),
  // })

  // const { data: userNftsTokenURIs, isLoading: isUserNftsLoading, isSuccess: isFetchUserNftsSuccess } = useContractReads({
  //   contracts:
  //     userNftsUrisContractsConfig(),
  // })



  const fetchListedNfts = async () => {
    setLoadingListedNfts(true)
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
      console.log("fetch error: " + error)
    }
    setLoadingListedNfts(false);
  }
  React.useEffect(() => {
    fetchListedNfts();
  }, [listedNFTsId]);

  // const fetchUserNfts = async () => {
  //   try {
  //     const nftPromises = userNftsTokenURIs?.map(async (uri) => {
  //       const nftData = await fetch(uri?.result.toString());
  //       const json = await nftData.json(); // Assuming response is JSON
  //       return json
  //     });

  //     // 7. Set NFTs after all data is fetched
  //     const fetchedUserNfts = await Promise.all(nftPromises);
  //     setUserNfts(fetchedUserNfts);
  //   } catch (error) {
  //     console.error('Error fetching NFTs:', error);
  //     // Handle fetching errors appropriately (e.g., display error message)
  //   }
  // };
  // React.useEffect(() => {
  //   fetchUserNfts();
  // }, [userBalance, userNfts]);


  return (
    <>
      <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.connectedView}>
          <View style={styles.card}>
            <Text>
              FLP Balances: {userTokenBalance?.toString()}
            </Text>
            {/* <Text>
            BNB Balances: {userTokenBalance?.toString()}
          </Text> */}
            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >

            <Text>No Collectibles</Text>

          </ScrollView> */}
          </View>
          <View style={styles.card}>
            <Text>
              NFT for sells:
            </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
              {isListedNftsSuccess && listedNfts && listedNfts.length > 0 ? (listedNfts?.map((nft, index) => {
                return <NFTCard key={index} nft={nft} isLoading={isLoadingListedNfts} id={listedNFTsId[index]?.tokenId} price={listedNFTsId[index]?.price.toString() as number} isTransfer={true} isList={false} />
              })) : (
                <Text>No Collectibles</Text>
              )}
            </ScrollView>

          </View>

          <View style={styles.card}>
            <Text>
              ICO Packets
            </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
              <ICOCard price={0.1} amount={10000} />
              <ICOCard price={0.1} amount={10000} />
            </ScrollView>

          </View>
          {/* <Button text="Disconnect Wallet" onPress={handleDisconnect} /> */}
          {/* <WriteContract /> */}

        </View>
      </ScrollView >

    </>

  );
};

export { Store }; 