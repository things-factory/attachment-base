import { gql } from 'apollo-server-koa'

export const NewAttachment = gql`
  input NewAttachment {
    name: String!
    description: String
    mimetype: String!
    encoding: String!
    category: String!
  }
`
