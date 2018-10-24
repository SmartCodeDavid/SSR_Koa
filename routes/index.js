const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  console.log('index2')
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

router.get('/testasync', async (ctx, next) => {
  const a = await new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      resolve('a')
      clearTimeout(id)
    }, 1000);
  })
  
  ctx.body = a
})

module.exports = router