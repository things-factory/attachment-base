import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'

export const attachmentResolver = {
  async attachment(_: any, { id }, context: any) {
    return await getRepository(Attachment).findOne({
      where: { domain: context.state.domain, id, relations: ['domain', 'creator', 'updater'] }
    })
  }
}
