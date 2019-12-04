import gql from 'graphql-tag'

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
    fullpath: String
    refBy: String
    size: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
