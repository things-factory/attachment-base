import uuid from 'uuid/v4'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import { resolve } from 'path'
const send = require('koa-send')

import { config, logger } from '@things-factory/env'
import { STORAGE } from './attachment-const'

if (STORAGE && STORAGE.type == 'file') {
  const uploadDir = config.getPath(null, STORAGE.base || 'attachments')

  STORAGE.uploadFile = ({ stream, filename }) => {
    mkdirp.sync(uploadDir)

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
    const fullpath = resolve(uploadDir, path)

    await fs.unlink(fullpath, logger.error)
  }

  STORAGE.sendFile = async (context, attachment, next) => {
    await send(context, attachment, { root: uploadDir })
  }

  logger.info('File Storage is Ready.')
}
