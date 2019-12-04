import { config } from '@things-factory/env'

export var STORAGE: any = config.get('storage')
export const ATTACHMENT_DIR: string = (process.env.ATTACHMENT_DIR = config.getPath('attachmentsPath', 'attachments'))
