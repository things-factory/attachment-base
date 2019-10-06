import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'

export const attachmentsResolver = {
  async attachments(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(Attachment).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })

    return { items, total }
  }
}
