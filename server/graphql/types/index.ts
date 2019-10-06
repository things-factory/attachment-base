import { Filter, ObjectRef, Pagination, Sorting } from '@things-factory/shell'
import * as Attachment from './attachment'

export const queries = [Attachment.Query]

export const mutations = [Attachment.Mutation]

export const types = [Filter, Pagination, Sorting, ObjectRef, ...Attachment.Types]
