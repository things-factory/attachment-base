import { Attachment } from './attachment'
import { NewAttachment } from './new-attachment'
import { AttachmentPatch } from './attachment-patch'
import { AttachmentList } from './attachment-list'

export const Mutation = `
  createAttachment (
    attachment: NewAttachment!
  ): Attachment

  createAttachments (
    attachments: [NewAttachment]!
  ): [Attachment]

  updateAttachment (
    id: String!
    patch: AttachmentPatch!
  ): Attachment

  deleteAttachment (
    id: String!
  ): Attachment

  deleteAttachmentsByRef (
    refBys: String!
  ): Attachment

  singleUpload(
    file: Upload!
  ): Attachment

  multipleUpload(
    files: [Upload]!
  ): [Attachment]
`

export const Query = `
  attachments(filters: [Filter], pagination: Pagination, sortings: [Sorting]): AttachmentList
  attachment(id: String!): Attachment
`

export const Types = [Attachment, NewAttachment, AttachmentPatch, AttachmentList]
