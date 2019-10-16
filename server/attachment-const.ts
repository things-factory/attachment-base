import { config } from '@things-factory/env'

export const ATTACHMENT_DIR = (process.env.ATTACHMENT_DIR = config.getPath('attachmentsPath', 'attachments'))
