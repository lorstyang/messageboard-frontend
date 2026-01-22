import { useEffect, useState } from 'react'
import { publicClient } from '@/viem'
import { MESSAGE_BOARD_ADDRESS } from '@/contracts/messageBoard'
import { NewMessageEvent } from '@/contracts/events'
import { HISTORY_FROM_BLOCK, HISTORY_TO_BLOCK } from '@/config/history'
import type { Message } from '@/types/message'
import { mapLogs } from '@/util/util'

export function usePublicMessages() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    let cancelled = false

    async function load() {
      const logs = await publicClient.getLogs({
        address: MESSAGE_BOARD_ADDRESS,
        event: NewMessageEvent,
        fromBlock: HISTORY_FROM_BLOCK,
        toBlock: HISTORY_TO_BLOCK,
      })

      console.log('logs', logs, cancelled);

      if (!cancelled) {
        setMessages(mapLogs(logs))
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return messages
}
