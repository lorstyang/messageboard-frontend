// src/App.tsx
import { useState } from 'react'
import { walletClient } from '@/viem'
import { usePublicMessages } from '@/hooks/usePublicMessages'
import { useLiveMessages } from '@/hooks/useLiveMessages'
import { MessageCard } from '@/components/MessageCard'
import { AddressSearch } from '@/components/AddressSearch'
import { MessageInput } from '@/components/MessageInput'

function shortAddr(addr: string) {
  return addr.slice(0, 6) + '...' + addr.slice(-4)
}

export default function App() {
  const [account, setAccount] = useState<`0x${string}` | null>(null)
  const publicMessages = usePublicMessages()
  const [liveMessages, setLiveMessages] = useState<any[]>([])

  console.log(publicMessages)
  useLiveMessages(msg =>
    setLiveMessages(prev => [...prev, msg])
  )

  async function connect() {
    const [addr] = await walletClient.requestAddresses()
    setAccount(addr)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <div className="mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 flex items-center leading-[1.1]">
            <svg
              className="w-16 h-16 shrink-0 mr-3"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60a5fa" /> {/* blue-400 */}
                  <stop offset="50%" stopColor="#c084fc" /> {/* purple-400 */}
                  <stop offset="100%" stopColor="#f472b6" /> {/* pink-400 */}
                </linearGradient>
              </defs>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="ml-3 pt-1 leading-tight tracking-tight">Message Board</span>
          </h1>
          <p className="text-slate-400 text-lg mt-2">Decentralized on-chain messaging</p>
        </div>

        {!account ? (
          <div className="flex items-center justify-center min-h-96">
            <button
              onClick={connect}
              className="group relative px-8 py-4 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              🔌 Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300">
              <div className="text-sm font-medium text-slate-400 mb-2">
                Connected Wallet
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  {shortAddr(account)}
                </div>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Public Messages</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {[...publicMessages, ...liveMessages].length > 0 ? (
                    [...publicMessages, ...liveMessages].map((m, i) => (
                      <MessageCard key={i} {...m} />
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      No messages yet. Be the first to post!
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Search Messages</h2>
                <AddressSearch />
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Post Message</h2>
                <MessageInput account={account} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
