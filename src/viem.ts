import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const chains = [sepolia] as const

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})

const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? ''
if (!walletConnectProjectId) {
  console.warn('[wallet] Missing VITE_WALLETCONNECT_PROJECT_ID; WalletConnect will be disabled.')
}

export const wagmiConfig = getDefaultConfig({
  appName: 'Message Board',
  projectId: walletConnectProjectId || 'PROJECT_ID_REQUIRED',
  chains,
  ssr: false,
})
