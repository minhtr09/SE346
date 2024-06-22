import React, { useContext } from "react";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import { NftData } from "../type";
import {
  getBirdAbi,
  getBirdMarketPlaceAbi,
  getFloppyAbi,
} from "../contracts/utils/getAbis";
import {
  getBirdAddress,
  getBirdMarketPlaceAddress,
  getFloppyAddress,
} from "../contracts/utils/getAddress";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { State, actionCreators } from "../redux";
const StateContext = React.createContext(null);
export const StateContextProvider = ({ children }) => {
  const { isConnected, address } = useAccount();

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

  //Hook read contract

  const { data: userTokenBalance } = useContractRead({
    address: floppyAddress as any, // Bird address
    abi: floppyABI,
    functionName: "balanceOf",
    args: [address],
    enabled: true,
    onSuccess(data) {},
  });


  const fetchListedNfts = async (listedNfts : any) => {
    try {
      const nftPromises = (listedNfts as any)?.map(async (nft) => {
        const imageUrl = nft.url;
        const nftData = await fetch(imageUrl);

        const json = await nftData.json(); // Assuming response is JSON
        return json;
      });

      // 7. Set NFTs after all data is fetched
      await Promise.all(nftPromises);
      setListedNfts(nftPromises);
    } catch (error) {}
  };

  const fetchUserNfts = async (usersNftInfo : any) => {

    try {
      const tokenIds = usersNftInfo[0];
      const tokenUrls = usersNftInfo[1];
      const nftPromises = (tokenUrls as any)?.map(async (nftUrl) => {
        const nftData = await fetch(nftUrl);
        const json = await nftData.json(); // Assuming response is JSON

        return json;
      });

      // 7. Set NFTs after all data is fetched
      await Promise.all(nftPromises);
      const userNftsInfo : any[] = [];
      for(let i = 0; i < tokenIds.length; i++) {
        userNftsInfo.push({
          tokenId: tokenIds[i],
          tokenUrl: nftPromises[i]
        })
      }
      console.log(userNftsInfo, address);
      setUserNfts(userNftsInfo);
    } catch (error) {
      console.log("fetch error: " + error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        isConnected,
        address,
        userTokenBalance,
        fetchListedNfts,
        fetchUserNfts,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
