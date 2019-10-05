import { attachmentResolver } from './attachment'
import { attachmentsResolver } from './attachments'

import { updateAttachment } from './update-attachment'
import { createAttachment } from './create-attachment'
import { deleteAttachment } from './delete-attachment'

import { singleUpload, multipleUpload } from './upload'

export const Query = {
  ...attachmentsResolver,
  ...attachmentResolver
}

export const Mutation = {
  updateAttachment,
  createAttachment,
  deleteAttachment,
  singleUpload,
  multipleUpload
}
