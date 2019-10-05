import { Attachment } from './attachment'
import { NewAttachment } from './new-attachment'
import { AttachmentPatch } from './attachment-patch'
import { AttachmentList } from './attachment-list'
import { Filter, Pagination, Sorting } from '@things-factory/shell'

export const Mutation = `
  createAttachment (
    attachment: NewAttachment!
  ): Attachment

  updateAttachment (
    id: String!
    patch: AttachmentPatch!
  ): Attachment

  deleteAttachment (
    id: String!
  ): Attachment

  singleUpload(
    file: Upload!
  ): File

  multipleUpload(
    files: [Upload]!
  ): [File]
`

export const Query = `
  attachments(filters: [Filter], pagination: Pagination, sortings: [Sorting]): AttachmentList
  attachment(id: String!): Attachment
`

export const Types = [Filter, Pagination, Sorting, Attachment, NewAttachment, AttachmentPatch, AttachmentList]
