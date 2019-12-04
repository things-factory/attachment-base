import uuid from 'uuid/v4'
import { logger } from '@things-factory/env'

import { ATTACHMENT_DIR, STORAGE } from './attachment-const'

import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import { resolve } from 'path'

if (STORAGE && STORAGE.type == 'file') {
  STORAGE.uploadFile = ({ stream, filename }) => {
    const uploadDir = ATTACHMENT_DIR
    mkdirp.sync(ATTACHMENT_DIR)

    const id = uuid()
    const ext = filename.split('.').pop()
    const path = ext ? resolve(uploadDir, `${id}.${ext}`) : resolve(uploadDir, id)
    const relativePath = path
      .split('\\')
      .pop()
      .split('/')
      .pop()
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
        .on('finish', () => resolve({ id, path: relativePath, size }))
    )
  }

  STORAGE.deleteFile = async path => {
    const fullpath = resolve(ATTACHMENT_DIR, path)

    await fs.unlink(fullpath, logger.error)
  }

  console.log(
    '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&\n',
    STORAGE.type,
    STORAGE.uploadFile,
    STORAGE.deleteFile
  )
}
