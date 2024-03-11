'use client'

import useConversation from "@/app/hooks/useConversation"
import { FullMessageType } from "@/app/types"
import { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox"
import { Conversation, User } from "@prisma/client"
import axios from "axios"

interface BodyProps {
    initialMessages: FullMessageType[],
    conversation: Conversation & {
        users: User[]
    }
}

const Body: React.FC<BodyProps> = ({
    initialMessages,
    conversation
}) => {
    const [ messages, setMessages ] = useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)
    const { conversationId} = useConversation()

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox 
                    isLast={i === messages.length -1}
                    key={message.id}
                    data={message}
                    conversation={conversation}
                />
            ))}
            <div ref={bottomRef} className="pt-24" />
        </div>
    )
}

export default Body