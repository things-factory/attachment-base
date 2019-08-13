import { gql } from 'apollo-server-koa'

export const AttachmentList = gql`
  type AttachmentList {
    items: [Attachment]
    total: Int
  }
`
