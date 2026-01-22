import { useState } from 'react'
import { fetchMessagesByAddress } from '@/hooks/useMessagesByAddress'
import { MessageCard } from './MessageCard'

export function AddressSearch() {
    const [addr, setAddr] = useState('')
    const [addrSearched, setAddrSearched] = useState('')
    const [messages, setMessages] = useState<any[] | null>(null)
    const [searching, setSearching] = useState(false)

    async function search() {
        setSearching(true)
        const res = await fetchMessagesByAddress(addr as `0x${string}`)
        setAddrSearched(addr)
        setMessages(res)
        setSearching(false)
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    className="flex-1 px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="0x..."
                    value={addr}
                    onChange={e => setAddr(e.target.value)}
                />
                <button
                    onClick={search}
                    disabled={searching || !addr}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-700 disabled:opacity-50 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
                >
                    {searching ? '🔍 Searching...' : '🔍 Search'}
                </button>
            </div>

            {messages && messages.length > 0 && (
                <div className="space-y-3 mt-4">
                    <p className="text-sm text-slate-400">Found {messages.length} message(s)</p>
                    {messages.map((m, i) => {
                        const messageObj = {
                            content: m,
                            sender: addrSearched,
                        };
                        return <MessageCard key={i} {...messageObj} />;
                    })}
                </div>
            )}
        </div>
    )
}
