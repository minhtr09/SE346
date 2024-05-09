import '@walletconnect/react-native-compat'
import { WagmiConfig } from 'wagmi'
import { polygonMumbai, bscTestnet } from 'viem/chains'
import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '4e178defe3ed3ce84ed2b0c72f38aca8'

// 2. Create config



const metadata = {
    name: 'flappy bird',
    description: 'YOUR_PROJECT_DESCRIPTION',
    url: 'https://your-project-website.com/',
    icons: ['https://your-project-logo.com/'],
    redirect: {
        native: 'YOUR_APP_SCHEME://',
        universal: 'YOUR_APP_UNIVERSAL_LINK.com'
    }
}

const chains = [bscTestnet];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({
    projectId,
    chains,
    wagmiConfig,
})

export default function Wagmi({ children }: { children: React.ReactNode }) {
    return <WagmiConfig config={wagmiConfig}>
        {children}
        <Web3Modal />
    </WagmiConfig>
};