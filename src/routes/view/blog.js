/**
 * @description 微博 view 路由
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', async (ctx, next) => {
    await ctx.render('index', {})
})

module.exports = router