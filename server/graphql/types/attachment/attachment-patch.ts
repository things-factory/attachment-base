import { gql } from 'apollo-server-koa'

export const AttachmentPatch = gql`
  input AttachmentPatch {
    name: String
    description: String
    ext: String
    path: String
    size: String
  }
`
