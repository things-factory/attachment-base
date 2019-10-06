import promisesAll from 'promises-all'
import { createAttachment } from './create-attachment'

export async function createAttachments(_: any, { attachments }, context: any) {
  const { resolve, reject } = await promisesAll.all(
    attachments.map(attachment => createAttachment(_, { attachment }, context))
  )

  if (reject.length) {
    reject.forEach(({ name, message }) =>
      // eslint-disable-next-line no-console
      console.error(`${name}: ${message}`)
    )

    return reject
  }

  return resolve
}
