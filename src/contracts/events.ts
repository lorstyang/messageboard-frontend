// src/contracts/events.ts
import { parseAbiItem } from 'viem'

export const NewMessageEvent = parseAbiItem(
  'event NewMessage(address indexed sender, string message)'
)
