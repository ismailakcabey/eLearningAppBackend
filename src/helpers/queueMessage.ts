import { Logger } from '@nestjs/common'
const amqp = require("amqplib")
export const sendQueueMessage = async (message: string, data: any) => {
    try {
        const connection = await amqp.connect("amqp://guest:guest@localhost:5672")
        const channel = await connection.createChannel()
        const assertion = await channel.assertQueue(message)
        channel.sendToQueue(message, Buffer.from(JSON.stringify(data)))
    } catch (error) {
        Logger.error(error)
    }
}