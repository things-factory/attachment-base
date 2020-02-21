import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'

export async function updateAttachment(_: any, { id, patch }, context: any) {
  const attachment = await getRepository(Attachment).findOne({
    where: {
      domain: context.state.domain,
      id
    }
  })

  return await getRepository(Attachment).save({
    ...attachment,
    ...patch,
    updater: context.state.user
  })
}
