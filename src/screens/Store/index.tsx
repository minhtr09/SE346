import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ListedNFT, NftData } from '../../type';
import { getBirdAbi, getBirdMarketPlaceAbi } from '../../contracts/utils/getAbis';
import { useAccount, useContractRead, useContractReads } from 'wagmi';
import { styles } from './styles';

const Store: React.FC = () => {
  const { isConnected, address } = useAccount();
  const birdAddress = "0x8991514B8F03eaC4b2cCAd1247d6e953E4CB6a68"
  const birdABI = getBirdAbi()
  const marketPlaceAddress = "0xE7821c706b1085183320b484f613cd2e7debb2AF"
  const birdMarketPlaceABI = getBirdMarketPlaceAbi();
  const [listedNfts, setListedNfts] = React.useState<NftData[]>([]);
  const [userNfts, setUserNfts] = React.useState<NftData[]>([]);



  // Prepare contract configurations
  const birdContract = {
    address: birdAddress,
    abi: birdABI
  }

  // const listedNftsUrisContractsConfig = () => {
  //   const contracts = [];
  //   (listedNFTsId as ListedNFT[])?.map((nft) => {
  //     const contract = { ...birdContract, functionName: 'tokenURI', args: [nft?.tokenId] }
  //     contracts.push(contract);
  //   })
  // }

  //   return contracts;
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
  // const { data: listedNFTsId } = useContractRead({
  //   address: marketPlaceAddress, // Bird Market Place address
  //   abi: birdMarketPlaceABI,
  //   functionName: 'getListedNfts',
  //   enabled: true, onSuccess(data) {
  //     console.log('Success', data)
  //   },
  // });

  const { data: userBalance } = useContractRead({
    address: birdAddress, // Bird address
    abi: birdABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: true, onSuccess(data) {
      console.log('Success', data)
    },
  });


  // //get all listed NFTs in market place
  // const { data: listedNftsTokenURIs, isLoading: isListedNftsLoading, isSuccess: isListedNftsSuccess } = useContractReads({
  //   contracts:
  //     listedNftsUrisContractsConfig(),
  // })

  // //get user's nfts
  // const { data: allUserTokenId } = useContractReads({
  //   contracts:
  //     userNftsContractsConfig(userBalance),
  // })

  // const { data: userNftsTokenURIs, isLoading: isUserNftsLoading, isSuccess: isFetchUserNftsSuccess } = useContractReads({
  //   contracts:
  //     userNftsUrisContractsConfig(),
  // })



  // const fetchListedNfts = async () => {
  //   try {
  //     const nftPromises = listedNftsTokenURIs?.map(async (uri) => {
  //       const nftData = await fetch(uri?.result.toString());
  //       const json = await nftData.json(); // Assuming response is JSON
  //       return json
  //     });

  //     // 7. Set NFTs after all data is fetched
  //     const fetchedListedNfts = await Promise.all(nftPromises);
  //     setListedNfts(fetchedListedNfts);
  //   } catch (error) {

  //   }
  // }
  // React.useEffect(() => {
  //   fetchListedNfts();
  // }, [listedNFTsId, listedNfts]);

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
      <View style={styles.connectedView}>
        <View style={styles.card}>
          <Text>
            NFT for sells:
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >

            <Text>No Collectibles</Text>

          </ScrollView>
        </View>
        <View style={styles.card}>
          <Text>
            Owned NFT:
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

            <Text>No Collectibles</Text>

          </ScrollView>

        </View>
        {/* <Button text="Disconnect Wallet" onPress={handleDisconnect} /> */}
        {/* <WriteContract /> */}

      </View>


    </>

  );
};

export { Store };