import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'

export const deleteAttachment = {
  async deleteAttachment(_: any, { name }, context: any) {
    return await getRepository(Attachment).delete({ domain: context.state.domain, name })
  }
}
