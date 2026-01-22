import { useState } from 'react'
import { walletClient } from '@/viem'
import { messageBoardContract } from '@/contracts/messageBoard'

interface MessageInputProps {
    account: `0x${string}`;
}

export function MessageInput({ account }: MessageInputProps) {
    const [content, setContent] = useState('')
    const [posting, setPosting] = useState(false)

    async function send() {
        if (!content.trim()) return
        setPosting(true)
        await walletClient.writeContract({
            ...messageBoardContract,
            functionName: 'post',
            args: [content],
            account,
        })
        setContent('')
        setPosting(false)
    }

    const charCount = content.length
    const maxChars = 500

    return (
        <div className="space-y-3">
            <div className="relative">
                <textarea
                    className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 backdrop-blur-sm resize-none"
                    value={content}
                    onChange={e => setContent(e.target.value.slice(0, maxChars))}
                    placeholder="Share your thoughts..."
                    rows={4}
                />
                <div className="absolute bottom-2 right-3 text-xs text-slate-500">
                    {charCount}/{maxChars}
                </div>
            </div>
            <button
                onClick={send}
                disabled={posting || !content.trim()}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-slate-600 disabled:to-slate-700 disabled:opacity-50 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 active:scale-95"
            >
                {posting ? '📤 Posting...' : '📤 Post Message'}
            </button>
        </div>
    )
}
