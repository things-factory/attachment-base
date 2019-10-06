import { gql } from 'apollo-server-koa'

export const AttachmentPatch = gql`
  input AttachmentPatch {
    name: String
    description: String
    mimetype: String
    encoding: String
    category: String
    file: Upload
    refBy: String
  }
`
