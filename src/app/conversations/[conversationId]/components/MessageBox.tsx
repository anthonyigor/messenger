'use client'

import Avatar from "@/app/components/Avatar"
import { FullMessageType } from "@/app/types"
import { Conversation, User } from "@prisma/client"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import Image from "next/image"

interface MessageBoxProps {
    data: FullMessageType
    isLast?: boolean
    conversation: Conversation & {
        users: User[]
    }
}

const MessageBox: React.FC<MessageBoxProps> = ({
    data,
    isLast,
    conversation
}) => {
    const session = useSession()

    const isOwn = session.data?.user?.email === data.sender.email
    const seenList = (data.seen || [])
    .filter((user) => user.email !== session.data?.user?.email)
    .map((user) => user.name)
    .join(', ') 

    const container = clsx(
        "flex gap-3 p-4",
        isOwn && "justify-end"
    )
    
    const avatar = clsx(isOwn && "order-2")
    const body = clsx(
        "flex flex-col gap-2",
        isOwn && "items-end"
    )
    const message = clsx(
        "text-sm w-fit overflow-hidden",
        isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
        data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
    )

    return (
        <div className={container}>
            <div className={body}>
                {conversation.isGroup && (
                    <>
                    <div className={avatar}>
                        <Avatar user={data.sender}/>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="text-sm text-gray-500">
                            {data.sender.name}
                        </div>
                    </div>
                    </>
                )}
                <div className={message}>
                    {data.image ? (
                        <Image 
                            alt="Image"
                            height='288'
                            width='288'
                            src={data.image}
                            className="
                                object-cover
                                cursor-pointer
                                hover:scale-110
                                transition
                                translate
                            "
                        />
                    ) : (
                        <div>
                            {data.body}
                        </div>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="
                        text-xs
                        font-light
                        text-gray-500
                    "> 
                        Visto por {seenList}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MessageBox