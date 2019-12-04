import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'
import { STORAGE } from '../../../attachment-const'

export async function createAttachment(_: any, { attachment }, context: any) {
  const { file, category, refBy } = attachment
  const { createReadStream, filename, mimetype, encoding } = await file
  const stream = createReadStream()

  var { id, path, size } = await STORAGE.uploadFile({ stream, filename })

  return await getRepository(Attachment).save({
    domain: context.state.domain,
    creator: context.state.user,
    updater: context.state.user,
    id,
    name: filename,
    mimetype,
    encoding,
    refBy,
    category: category || mimetype.split('/').shift(),
    size: size as any,
    path
  })
}
