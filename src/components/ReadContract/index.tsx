import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@web3modal/ui-react-native';

import { useAccount, useContractRead, useDisconnect } from 'wagmi';
import RequestModal from '../RequestModal';
import { getFloppyAbi, getCrowdSaleAbi, getUsdtAbi } from '../../contracts/utils/getAbis';


export function ReadContract() {
    const [requestModalVisible, setRequetsModalVisible] = useState(false);
    const { isConnected, address } = useAccount();
    const floppyAbi = getFloppyAbi()
    const { disconnect } = useDisconnect()


    const { data, isError, isLoading, isSuccess } = useContractRead({
        //floppy address
        address: '0xCCec906001af3cF82ceb78E3f078eD04C3274C45',
        abi: floppyAbi,
        functionName: 'balanceOf',
        enabled: requestModalVisible,
        args: [address],

    });

    const onPress = () => {
        console.log(address);
        setRequetsModalVisible(true);
        console.log(data.toString());
    };

    return isConnected ? (
        <View>
            <Button disabled={isLoading} onPress={() => onPress()}>
                Read contract
            </Button>

            <RequestModal
                isVisible={requestModalVisible}
                isLoading={isLoading}
                rpcResponse={isSuccess ? data?.toString() : undefined}
                rpcError={isError ? 'Error reading contract' : undefined}
                onClose={() => setRequetsModalVisible(false)}
            />
        </View>
    ) : null;
}