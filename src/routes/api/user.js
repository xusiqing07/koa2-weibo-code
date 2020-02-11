/**
 * 负责派发路由和参数获取
 * User API
 */

const router = require('koa-router')()

const { isExist, register, login, deleteCurUser, changeInfo } = require('../../controller/user')
const { userValidate } = require('../../validator/user')
const { generateValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginChecks')
const { isTest } = require('../../utils/env')

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

router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})

router.post('/delete', loginCheck, async (ctx, next) => {
    if(isTest) {
        const { userName } = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

router.patch('/changeInfo', loginCheck, generateValidator(userValidate), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

module.exports = router