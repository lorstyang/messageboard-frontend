import { useEffect } from 'react'
import { publicClient } from '@/viem'
import { MESSAGE_BOARD_ADDRESS } from '@/contracts/messageBoard'
import { NewMessageEvent } from '@/contracts/events'
import { mapLogs } from '@/util/util'

export function useLiveMessages(
    onNewMessage: (msg: any) => void
) {
    useEffect(() => {
        // 监听新 logs
        console.log('Watching for new messages...')
        const unwatch = publicClient.watchEvent({
            address: MESSAGE_BOARD_ADDRESS,
            event: NewMessageEvent,
            args: undefined, // 先监控任何人
            onLogs(newLogs) {
                onNewMessage(mapLogs(newLogs))
            },
        })

        return () => unwatch()
    }, [])
}
