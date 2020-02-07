const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:userName/:name', async (ctx, next) => {
  const { userName } = ctx.params;
  ctx.body = {
    title: 'this is profile',
    userName,
  }
})

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName,pageIndex } = ctx.params;
  ctx.body = {
    title: 'this is loadMore',
    userName,
    pageIndex
  }
})

module.exports = router
