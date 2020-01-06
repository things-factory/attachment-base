import gql from 'graphql-tag'

export const NewAttachment = gql`
  input NewAttachment {
    category: String
    file: Upload!
    refBy: String
  }
`
