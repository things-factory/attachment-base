import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'
import { STORAGE } from '../../../attachment-const'

export async function deleteAttachment(_: any, { id }, context: any) {
  const repository = getRepository(Attachment)
  const attachment = await repository.findOne({
    where: { domain: context.state.domain, id }
  })

  await repository.delete(id)

  await STORAGE.deleteFile(attachment.path)
}
