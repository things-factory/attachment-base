import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'

export const createAttachment = {
  async createAttachment(_: any, { attachment }, context: any) {
    return await getRepository(Attachment).save({
      domain: context.domain,
      creatorId: context.state.user.id,
      updaterId: context.state.user.id,
      ...attachment
    })
  }
}
