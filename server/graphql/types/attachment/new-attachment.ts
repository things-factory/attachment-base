import { gql } from 'apollo-server-koa'

export const NewAttachment = gql`
  input NewAttachment {
    category: String
    file: Upload!
    refBy: String
  }
`
