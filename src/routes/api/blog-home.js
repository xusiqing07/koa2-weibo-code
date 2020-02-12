/**
 * @description 首页API路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')
const blogValidate = require('../../validator/blog')
const { generateValidator } = require('../../middlewares/validator')

router.prefix('/api/blog')

// 创建微博
router.post('/create', generateValidator(blogValidate), async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create({ userId, content, image })
})

module.exports = router