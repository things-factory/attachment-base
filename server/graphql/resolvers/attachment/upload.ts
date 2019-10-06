import promisesAll from 'promises-all'

import { createAttachment } from './create-attachment'

export async function singleUpload(_, { file }, context: any) {
  return await createAttachment(_, { attachment: { file } }, context)
}

export async function multipleUpload(_, { files }, context: any) {
  const { resolve, reject } = await promisesAll.all(
    files.map(file => createAttachment(_, { attachment: { file } }, context))
  )

  if (reject.length)
    reject.forEach(({ name, message }) =>
      // eslint-disable-next-line no-console
      console.error(`${name}: ${message}`)
    )

  return resolve
}
