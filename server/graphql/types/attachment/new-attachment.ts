import { gql } from 'apollo-server-koa'

export const NewAttachment = gql`
  input NewAttachment {
    name: String!
    description: String
    category: String!
    ext: String!
    path: String!
    size: String!
  }
`
