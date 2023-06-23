import { Logger } from "@nestjs/common";

const Mailjet = require('node-mailjet');

export const emailSend = (html:any,toEmail:string,toName:string,subject:string,textPart:string) => {
    const mailjet = new Mailjet({
        apiKey: process.env.MAIL_JET_API_KEY,
        apiSecret: process.env.MAIL_JET_API_SECRET_KEY
      });
      const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: process.env.MAIL_JET_SEND_EMAIL,
                Name: "E-Learning"
              },
              To: [
                {
                  Email: toEmail,
                  Name: toName
                }
              ],
              Subject: subject,
              TextPart: textPart,
              HTMLPart: html
            }
          ]
        })
request
    .then((result) => {
    })
    .catch((err) => {
        Logger.error(err)

    })

}