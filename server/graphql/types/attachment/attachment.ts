import { gql } from 'apollo-server-koa'

export const Attachment = gql`
  type Attachment {
    id: String
    domain: Domain
    name: String
    description: String
    mimetype: String
    encoding: String
    category: String
    path: String
    size: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
