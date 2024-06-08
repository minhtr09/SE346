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

  const { data: marketBalance } = useContractRead({
    address: birdAddress as any, // Bird address
    abi: birdABI,
    functionName: "balanceOf",
    args: [marketPlaceAddress as any],
    enabled: true,
    onSuccess() {
      fetchListedNfts();
    },
  });
  const { data: userTokenBalance } = useContractRead({
    address: floppyAddress as any, // Bird address
    abi: floppyABI,
    functionName: "balanceOf",
    args: [address],
    enabled: true,
  });

  const { data: nfts } = useContractRead({
    address: marketPlaceAddress as any,
    abi: birdMarketPlaceABI,
    functionName: "getListedNfts",
    enabled: true,
    onSuccess(data) {
      fetchListedNfts();
      fetchUserNfts();
    },
  });

  const { data: userNftBalance } = useContractRead({
    address: birdAddress as any,
    abi: birdABI,
    functionName: "balanceOf",
    args: [address],
    enabled: true,
    onSuccess(data) {
      fetchUserNfts();
    },
  });
  const birdContract = {
    address: birdAddress,
    abi: birdABI,
  };

  const prepareContractsTokenIdOwnedByUser = () => {
    const contractsConfig: any[] = [];
    try {
      for (let i = 0; i < (userNftBalance as number); i++) {
        contractsConfig.push({
          ...birdContract,
          functionName: "tokenOfOwnerByIndex",
          args: [address, i],
        });
      }
    } catch (error) {
      console.log(error);
    }

    return contractsConfig;
  };
  const { data: tokenIdsOwnedByUser } = useContractReads({
    contracts: prepareContractsTokenIdOwnedByUser(),
    onSuccess(data) {
      fetchUserNfts();
    },
  });

  const prepareContractsUserTokenIdUrl = () => {
    const ids: number[] = [];
    const contractsConfig: any[] = [];
    try {
      for (let i = 0; i < tokenIdsOwnedByUser.length; i++) {
        const id = tokenIdsOwnedByUser[i].result;
        ids.push(id as number);
      }

      for (let i = 0; i < tokenIdsOwnedByUser.length; i++) {
        contractsConfig.push({
          ...birdContract,
          functionName: "tokenURI",
          args: [ids[i]],
        });
      }
    } catch (error) {
      console.log(error);
    }

    return contractsConfig;
  };
  const { data: tokenUrlsOwnedByUser } = useContractReads({
    contracts: prepareContractsUserTokenIdUrl(),

    onSuccess(data) {
      fetchUserNfts();
    },
  });

  const fetchListedNfts = async () => {
    try {
      const nftPromises = (nfts as any)?.map(async (nft) => {
        const imageUrl = nft.url;
        const nftData = await fetch(imageUrl);

        const json = await nftData.json(); // Assuming response is JSON
        return json;
      });

      // 7. Set NFTs after all data is fetched
      await Promise.all(nftPromises);
      setListedNfts(nftPromises);
    } catch (error) {
      console.log("fetch error: " + error);
    }
  };

  const fetchUserNfts = async () => {
    try {
      const nftPromises = (tokenUrlsOwnedByUser as any)?.map(async (nft) => {
        const imageUrl = nft.result;
        const nftData = await fetch(imageUrl);

        const json = await nftData.json(); // Assuming response is JSON
        return json;
      });

      // 7. Set NFTs after all data is fetched
      await Promise.all(nftPromises);
      setUserNfts(nftPromises);
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
        userNftBalance,
        fetchUserNfts,
        tokenIdsOwnedByUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
