import { useState } from 'react'
import { publicClient, walletClient } from './viem'
import { messageBoardContract } from './contracts/messageBoard'

function shortAddr(addr: string) {
  return addr.slice(0, 6) + '...' + addr.slice(-4)
}

export default function App() {
  const [account, setAccount] = useState<`0x${string}` | null>(null)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  async function connect() {
    const [addr] = await walletClient.requestAddresses()
    setAccount(addr)
    loadMessages(addr)
  }

  async function loadMessages(addr: `0x${string}`) {
    const count = await publicClient.readContract({
      ...messageBoardContract,
      functionName: 'getMessageCount',
      args: [addr],
    })

    const list: string[] = []
    for (let i = 0n; i < count; i++) {
      const msg = await publicClient.readContract({
        ...messageBoardContract,
        functionName: 'getMessage',
        args: [addr, i],
      })
      list.push(msg)
    }
    setMessages(list.reverse())
  }

  async function postMessage() {
    if (!account || !input) return
    setLoading(true)

    await walletClient.writeContract({
      ...messageBoardContract,
      functionName: 'post',
      args: [input],
      account,
    })

    setInput('')
    await loadMessages(account)
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 40 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>📜 On-chain Message Board</h1>
      <p style={{ color: '#94a3b8', marginBottom: 24 }}>
        Your messages, permanently stored on-chain.
      </p>

      {!account ? (
        <button onClick={connect}>🔌 Connect Wallet</button>
      ) : (
        <>
          <div
            style={{
              background: '#020617',
              border: '1px solid #1e293b',
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <div style={{ marginBottom: 8, color: '#94a3b8' }}>
              Connected as
            </div>
            <div style={{ fontWeight: 600 }}>
              {shortAddr(account)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            <input
              style={{ flex: 1 }}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Write something on-chain..."
            />
            <button onClick={postMessage} disabled={loading}>
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>

          <div>
            {messages.length === 0 && (
              <div style={{ color: '#64748b' }}>
                No messages yet.
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  background: '#020617',
                  border: '1px solid #1e293b',
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 12,
                }}
              >
                {m}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
