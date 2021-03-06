import { attachmentResolver } from './attachment'
import { attachmentsResolver } from './attachments'

import { updateAttachment } from './update-attachment'
import { createAttachment } from './create-attachment'
import { createAttachments } from './create-attachments'
import { deleteAttachment } from './delete-attachment'
import { deleteAttachmentsByRef } from './delete-attachments-by-ref'

import { singleUpload, multipleUpload } from './upload'

export const Query = {
  ...attachmentsResolver,
  ...attachmentResolver
}

export const Mutation = {
  updateAttachment,
  createAttachment,
  createAttachments,
  deleteAttachment,
  deleteAttachmentsByRef,
  singleUpload,
  multipleUpload
}
