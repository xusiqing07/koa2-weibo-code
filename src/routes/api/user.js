/**
 * 负责派发路由和参数获取
 * User API
 */

const router = require('koa-router')()

const { isExist } = require('../../controller/user')

router.prefix('/api/user')

// 注册路由
router.post('/register', async (ctx, next) => {

})

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    console.log(userName)
    ctx.body = await isExist(userName)
})

module.exports = router