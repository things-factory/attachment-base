import uuid from 'uuid/v4'

import { ATTACHMENT_DIR } from '../../../attachment-const'

import * as fs from 'fs'
import * as mkdirp from 'mkdirp'

const { resolve } = require('path')

export const storeFS = ({ stream, filename }) => {
  const uploadDir = ATTACHMENT_DIR
  mkdirp.sync(ATTACHMENT_DIR)

  const id = uuid()
  const ext = filename.split('.').pop()
  const path = ext ? resolve(uploadDir, `${id}.${ext}`) : resolve(uploadDir, id)
  var size: number = 0

  return new Promise<{ id: string; path: string; size: number }>((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(path)
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('data', chunk => (size += chunk.length))
      .on('finish', () => resolve({ id, path, size }))
  )
}
