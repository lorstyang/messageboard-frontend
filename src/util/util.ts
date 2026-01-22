import type { Message } from '@/types/message'

export function mapLogs(logs: any[]): Message[] {
  return logs.map(log => ({
    sender: log.args.sender,
    content: log.args.message,
    blockNumber: log.blockNumber!,
    txHash: log.transactionHash!,
  }))
}