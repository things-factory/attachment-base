import promisesAll from 'promises-all'
import { storeFS } from './store-filesystem'

import { createAttachment } from './create-attachment'

const _upload = async (_, { file }, context) => {
  const { stream, filename, mimetype, encoding } = await file

  var { id, path, size } = await storeFS({ stream, filename })
  path = path
    .split('\\')
    .pop()
    .split('/')
    .pop()

  return await createAttachment(
    _,
    {
      attachment: {
        id,
        name: filename,
        mimetype,
        encoding,
        path,
        category: mimetype.split('/').shift(),
        size
      }
    },
    context
  )
}

export async function singleUpload(_, { file }, context: any) {
  return await _upload(_, { file }, context)
}

export async function multipleUpload(_, { files }, context: any) {
  const { resolve, reject } = await promisesAll.all(files.map(file => _upload(_, { file }, context)))

  if (reject.length)
    reject.forEach(({ name, message }) =>
      // eslint-disable-next-line no-console
      console.error(`${name}: ${message}`)
    )

  return resolve
}
