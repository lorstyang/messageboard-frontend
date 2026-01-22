import { publicClient } from '@/viem'
import { messageBoardContract } from '@/contracts/messageBoard'

export async function fetchMessagesByAddress(
  address: `0x${string}`
) {
    const nCnt = await publicClient.readContract({
        ...messageBoardContract,
        functionName: 'getMessageCount',
        args: [address],
    })
    
    const messages = []
    for (let i = 0n; i < nCnt; i++) {
        const message = await publicClient.readContract({
        ...messageBoardContract,
        functionName: 'getMessage',
        args: [address, i],
        })
        messages.push(message)
    }
    return messages
}
