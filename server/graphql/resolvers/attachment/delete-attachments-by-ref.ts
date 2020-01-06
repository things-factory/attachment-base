import promisesAll from 'promises-all'
import { getRepository, In } from 'typeorm'
import { Attachment } from '../../../entities'
import { STORAGE } from '../../../attachment-const'

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
      await STORAGE.deleteFile(attachment.path)
    })
  )
}
