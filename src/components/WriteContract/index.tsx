import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@web3modal/ui-react-native';

import { useAccount, useContractWrite, usePrepareContractWrite, useSignMessage, usePrepareSendTransaction, useSendTransaction } from 'wagmi';
import RequestModal from '../RequestModal';
import { parseEther } from 'viem';
import { getFloppyAbi, getCrowdSaleAbi, getUsdtAbi, getBirdAbi } from '../../contracts/utils/getAbis';

export function WriteContract() {
    const [requestModalVisible, setRequetsModalVisible] = useState(false);
    const { isConnected, address } = useAccount();


    const address_1 = "0xf9577C9df5141B8793df5B869E0548dD8fBe3Ce9"
    const crowdSaleAbi = getCrowdSaleAbi();
    const { config } = usePrepareContractWrite({
        address: '0xCEd5FeDA4319aA0113b4C3abc0caAa0Da484F2Df',
        abi: crowdSaleAbi,
        functionName: 'buyTokenByMATIC',
        enabled: requestModalVisible,
        value: parseEther('0.00001'),
    });

    const { data, isLoading, isSuccess, isError, write } = useContractWrite(config)
    const onPress = () => {
        setRequetsModalVisible(true);
        try {
            write();
        } catch (error) {
            console.log(error);
        }
    };



    return isConnected ? (
        <View>
            <Button disabled={isLoading} onPress={() => onPress()}>
                Write contract
            </Button>

            <RequestModal
                isVisible={requestModalVisible}
                isLoading={isLoading}
                rpcResponse={isSuccess ? data?.toString() : undefined}
                rpcError={isError ? 'Error writing contract' : undefined}
                onClose={() => setRequetsModalVisible(false)}
            />
        </View>
    ) : null;
}