import { gql } from 'apollo-server-koa'

export const Attachment = gql`
  type Attachment {
    id: String
    name: String
    domain: Domain
    ext: String
    category: String
    path: String
    size: String
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
