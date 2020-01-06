import gql from 'graphql-tag'

export const AttachmentList = gql`
  type AttachmentList {
    items: [Attachment]
    total: Int
  }
`
