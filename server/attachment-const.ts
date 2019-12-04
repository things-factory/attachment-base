import { config } from '@things-factory/env'

export var STORAGE: any = config.get('storage')
export const ATTACHMENT_PATH: string = config.get('attachmentPath', 'attachment')
