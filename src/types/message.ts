// src/types/message.ts
export interface Message {
  sender: `0x${string}`
  content: string
  blockNumber: bigint
  txHash: `0x${string}`
}
