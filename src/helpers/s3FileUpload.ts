import * as AWS from 'aws-sdk';
import { Logger } from '@nestjs/common';

export const s3Upload = async (file,fileName,fileType) => {
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });
    const s3 = new AWS.S3()
    
   try {
    await s3.putObject({
        Body:file,
        Bucket:process.env.AWS_BUCKET,
        Key:`${fileName}${new Date}.${fileType}`
    }).promise()
   } catch (error) {
    Logger.error(error)
   }
}