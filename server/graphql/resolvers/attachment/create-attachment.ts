import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'

export async function createAttachment(_: any, { attachment }, context: any) {
  return await getRepository(Attachment).save({
    domain: context.state.domain,
    creatorId: context.state.user.id,
    updaterId: context.state.user.id,
    ...attachment
  })
}
