import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Attachment } from '../../../entities'

export const attachmentsResolver = {
  async attachments(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(Attachment).createQueryBuilder()
    buildQuery(queryBuilder, params, context)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('Attachment.creator', 'Creator')
      .leftJoinAndSelect('Attachment.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
