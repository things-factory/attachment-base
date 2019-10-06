import { createAttachment } from './create-attachment'
import { createAttachments } from './create-attachments'

export async function singleUpload(_, { file }, context: any) {
  return await createAttachment(_, { attachment: { file } }, context)
}

export async function multipleUpload(_, { files }, context: any) {
  return await createAttachments(_, { attachments: { files } }, context)
}
