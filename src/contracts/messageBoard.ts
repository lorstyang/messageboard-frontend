import { messageBoardAbi } from '../abi/messageBoard.ts'

export const MESSAGE_BOARD_ADDRESS =
  '0x14935395232fe606AaE65aA706F21B17E3D3AfC3' as const

export const messageBoardContract = {
  address: MESSAGE_BOARD_ADDRESS,
  abi: messageBoardAbi,
} as const
