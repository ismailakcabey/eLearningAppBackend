import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, Connection } from 'amqplib';
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
        console.log("error: " + error)
    }
  }

    emailReadConsume=  async ()=>{
        const connection = await amqp.connect(this.configService.get('RABBIT_MQ_CONNECTION_URL'))
        const channel = await connection.createChannel()
        const assertion = await channel.assertQueue("email")
        channel.consume("email",message=>{
        channel.ack(message)
        const user = JSON.parse(message.content.toString())
        console.log(user)
        if(user){
            console.log("mesaj okundu gelen kullanıcı: "+ user)
        }
    })
  }

}

