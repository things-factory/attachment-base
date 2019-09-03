import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'

export const attachmentResolver = {
  async attachment(_: any, { name }, context: any) {
    return await getRepository(Attachment).findOne({
      where: { domain: context.state.domain, name, relations: ['domain', 'creator', 'updater'] }
    })
  }
}
