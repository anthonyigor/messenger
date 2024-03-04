import prisma from '@/app/libs/prismadb'

const getMessages = async (converstationId: string) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId: converstationId
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return messages
    } catch (error) {
        return []
    }

}

export default getMessages