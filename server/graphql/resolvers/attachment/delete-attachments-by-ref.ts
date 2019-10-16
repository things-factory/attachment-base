import * as fs from 'fs'
import * as path from 'path'
import promisesAll from 'promises-all'
import { getRepository, In } from 'typeorm'
import { Attachment } from '../../../entities'
import { ATTACHMENT_DIR } from '../../../attachment-const'

export async function deleteAttachmentsByRef(_: any, { refBys }, context: any) {
  const repository = getRepository(Attachment)
  const attachments = await getRepository(Attachment).find({
    where: { domain: context.state.domain, refBy: In(refBys) }
  })

  //remove attachment from repo
  await repository.delete({
    refBy: In(refBys)
  })

  //remove files from attachments folder
  await promisesAll.all(
    attachments.map(async attachment => {
      const fullpath = path.resolve(ATTACHMENT_DIR, attachment.path)
      await fs.unlink(fullpath, e => {
        console.error(e)
      })
    })
  )
}
