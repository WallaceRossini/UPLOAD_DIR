import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const tmpFolder = path.resolve(__dirname, '..', '..', 'upload')

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')

      const filename = `${fileHash}-${file.originalname}`

      return callback(null, filename)
    }
  })
}
