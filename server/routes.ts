const send = require('koa-send')
const { ATTACHMENT_DIR } = require('./attachment-const')

process.on('bootstrap-module-history-fallback' as any, (app, fallbackOption) => {
  /*
   * fallback white list를 추가할 수 있다
   *
   * ex) fallbackOption.whiteList.push('/authcheck')
   */
})

process.on('bootstrap-module-route' as any, (app, routes) => {
  /*
   * koa application에 routes 를 추가할 수 있다.
   *
   * ex) routes.get('/path', async(context, next) => {})
   * ex) routes.post('/path', async(context, next) => {})
   */

  // for providing resource
  routes.get('/attachment/:attachment', async (context, next) => {
    await send(context, context.params.attachment, { root: ATTACHMENT_DIR })
  })
})
