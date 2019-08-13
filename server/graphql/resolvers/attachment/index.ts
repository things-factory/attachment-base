import { attachmentResolver } from './attachment'
import { attachmentsResolver } from './attachments'

import { updateAttachment } from './update-attachment'
import { createAttachment } from './create-attachment'
import { deleteAttachment } from './delete-attachment'

export const Query = {
  ...attachmentsResolver,
  ...attachmentResolver
}

export const Mutation = {
  ...updateAttachment,
  ...createAttachment,
  ...deleteAttachment
}
