export const messageBoardAbi = [
  {
    type: 'function',
    name: 'post',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'message', type: 'string' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'getMessage',
    stateMutability: 'view',
    inputs: [
      { name: 'user', type: 'address' },
      { name: 'index', type: 'uint256' },
    ],
    outputs: [{ type: 'string' }],
  },
  {
    type: 'function',
    name: 'getMessageCount',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'event',
    name: 'NewMessage',
    inputs: [
      { name: 'sender', type: 'address', indexed: true },
      { name: 'message', type: 'string', indexed: false },
    ],
  },
] as const
