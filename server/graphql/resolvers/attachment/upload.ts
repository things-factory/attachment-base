import uuid from 'uuid/v4'

const path = require('path')
const ATTACHMENT_DIR = process.env.ATTACHMENT_DIR || path.join(process.cwd(), 'attachments')

import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'

import * as fs from 'fs'
import promisesAll from 'promises-all'
import * as mkdirp from 'mkdirp'

const { resolve } = require('path')

const storeFS = ({ stream, filename }) => {
  const uploadDir = ATTACHMENT_DIR
  mkdirp.sync(ATTACHMENT_DIR)

  const id = uuid()
  const ext = filename.split('.').pop()
  const path = ext ? resolve(uploadDir, `${id}.${ext}`) : resolve(uploadDir, id)

  return new Promise<{ id: string; path: string }>((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(path)
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  )
}

const storeDB = async file => {
  const repository = getRepository(Attachment)
  return await repository.save(file)
}

const processUpload = async upload => {
  const { stream, filename, mimetype, encoding } = await upload
  var { id, path } = await storeFS({ stream, filename })
  path = path
    .split('\\')
    .pop()
    .split('/')
    .pop()
  return await storeDB({ id, filename, mimetype, encoding, path })
}

export async function singleUpload(_, { file }) {
  return await processUpload(file)
}

export async function multipleUpload(_, { files }) {
  const { resolve, reject } = await promisesAll.all(files.map(processUpload))

  if (reject.length)
    reject.forEach(({ name, message }) =>
      // eslint-disable-next-line no-console
      console.error(`${name}: ${message}`)
    )

  return resolve
}