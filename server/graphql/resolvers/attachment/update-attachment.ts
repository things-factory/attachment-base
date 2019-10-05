import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'

export const updateAttachment = {
  async updateAttachment(_: any, { id, patch }, context: any) {
    const repository = getRepository(Attachment)
    const attachment = await repository.findOne({ id })

    return await repository.save({
      ...attachment,
      ...patch,
      updaterId: context.state.user.name
    })
  }
}
