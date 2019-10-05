import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'
import * as fs from 'fs'
import * as path from 'path'

export const deleteAttachment = {
  async deleteAttachment(_: any, { id }, context: any) {
    const repository = getRepository(Attachment)

    const attachment = await repository.findOne(id)
    await repository.delete(id)

    const uploadDir = process.env.UPLOAD_DIR
    const fullpath = path.resolve(uploadDir, attachment.path)

    await fs.unlink(fullpath, e => {
      console.error(e)
    })
  }
}
