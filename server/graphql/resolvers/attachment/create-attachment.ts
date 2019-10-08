import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'
import { storeFS } from './store-filesystem'

export async function createAttachment(_: any, { attachment }, context: any) {
  const { file, category, refBy } = attachment
  const { createReadStream, filename, mimetype, encoding } = await file
  const stream = createReadStream()

  var { id, path, size } = await storeFS({ stream, filename })
  path = path
    .split('\\')
    .pop()
    .split('/')
    .pop()

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
