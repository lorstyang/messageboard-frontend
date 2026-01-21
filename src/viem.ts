import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { sepolia } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
})

const ethereum = typeof window !== 'undefined'
  ? window.ethereum
  : undefined

export const walletClient = createWalletClient({
  chain: sepolia,
  transport: ethereum
    ? custom(ethereum)
    : http(), // fallback
})