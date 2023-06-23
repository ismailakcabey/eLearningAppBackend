import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, Connection } from 'amqplib';
import { emailSend } from 'src/helpers/emailSend';
import { verifyMail } from 'src/utils/verifyMail';
const amqp = require("amqplib")
@Injectable()
export class RabbitMQService implements OnModuleInit {

    constructor(
        private readonly configService: ConfigService
    ){}

  async onModuleInit() {
    try {
        this.emailReadConsume()
    } catch (error) {
        Logger.error("error: " + error)
    }
  }

    emailReadConsume=  async ()=>{
        const connection = await amqp.connect(this.configService.get('RABBIT_MQ_CONNECTION_URL'))
        const channel = await connection.createChannel()
        const assertion = await channel.assertQueue("email")
        channel.consume("email",message=>{
        channel.ack(message)
        const user = JSON.parse(message.content.toString())
        
        if(user){
            const verifyEmail = verifyMail(user.id)
            const sendEmail = emailSend(verifyEmail,user.email,user.name,"Doğrulama Maili","Hesabınızı lütfen doğrulayın")
            
        }
    })
  }

}

