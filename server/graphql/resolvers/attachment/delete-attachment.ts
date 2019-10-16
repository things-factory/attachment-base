import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'
import * as fs from 'fs'
import * as path from 'path'

import { ATTACHMENT_DIR } from '../../../attachment-const'

export async function deleteAttachment(_: any, { id }, context: any) {
  const repository = getRepository(Attachment)
  const attachment = await repository.findOne({
    where: { domain: context.state.domain, id }
  })

  await repository.delete(id)

  const fullpath = path.resolve(ATTACHMENT_DIR, attachment.path)

  await fs.unlink(fullpath, e => {
    console.error(e)
  })
}
