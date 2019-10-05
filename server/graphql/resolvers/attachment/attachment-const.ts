const path = require('path')

export const ATTACHMENT_DIR = process.env.ATTACHMENT_DIR || path.join(process.cwd(), 'attachments')
