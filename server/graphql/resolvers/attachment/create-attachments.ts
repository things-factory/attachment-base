import promisesAll from 'promises-all'
import { createAttachment } from './create-attachment'
import { logger } from '@things-factory/env'

export async function createAttachments(_: any, { attachments }, context: any) {
  const { resolve, reject } = await promisesAll.all(
    attachments.map(attachment => createAttachment(_, { attachment }, context))
  )

  if (reject.length) {
    reject.forEach(({ name, message }) => logger.error(`${name}: ${message}`))

    return reject
  }

  return resolve
}
