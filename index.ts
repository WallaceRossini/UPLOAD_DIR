import fs from 'fs';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { UploadFileService } from './src/services/UploadFileService';

async function ListFiles(directory: string, files?: Array<any>) {

  if (!files) files = [];

  let arr_files = await fs.promises.readdir(directory);

  for (let i in arr_files) {

    let stat = await fs.promises.stat(`${directory}/${arr_files[i]}`)


    if (stat.isDirectory())
      await ListFiles(`${directory}/${arr_files[i]}`, files)
    else
      files.push(`${__dirname}/${directory}/${arr_files[i]}`)

  }
  return files;
}

async function start() {
  let files = await ListFiles('./upload')

  const uploadFileService = new UploadFileService();

  for (let i in files) {
    console.log(`File ${i}`)
    // const url = await uploadFileService.execute(files[i])
    // console.log(url)
  }

  return files;

}

start()
