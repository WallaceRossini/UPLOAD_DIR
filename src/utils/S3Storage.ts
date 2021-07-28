import aws, { S3 } from 'aws-sdk';
import path from 'path';
import multerConfig from '../configs/multer';
import mime from 'mime-types';
import fs from 'fs'

export class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_DEFAULT_REGION,
    })
  }



  async saveFile(filename: string): Promise<string> {
    const originalPath = path.resolve(filename)
    console.log(originalPath)

    const ContentType = mime.contentType(originalPath);

    if (!ContentType)
      throw new Error('File not found!')

    const fileContent = await fs.promises.readFile(originalPath)
    this.client.putObject({
      Bucket: String(process.env.BUCKET_NAME),
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    }).promise();

    await fs.promises.unlink(originalPath)

    console.log(`${process.env.S3_URL}${filename}`)

    const url = `${String(process.env.S3_URL)}${filename}`;

    return url

  }

  async deleteFile(filename: string): Promise<void> {

    await this.client
      .deleteObject({
        Bucket: String(process.env.BUCKET_NAME),
        Key: filename,
      })
  }


}