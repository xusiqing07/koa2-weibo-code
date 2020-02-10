/**
 * 负责派发路由和参数获取
 * User API
 */

const router = require('koa-router')()

const { isExist, register } = require('../../controller/user')
const { userValidate } = require('../../validator/user')
const { generateValidator } = require('../../middlewares/validator')

router.prefix('/api/user')

// 注册路由
router.post('/register', generateValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({
        userName,
        password,
        gender
    })
})

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

module.exports = router