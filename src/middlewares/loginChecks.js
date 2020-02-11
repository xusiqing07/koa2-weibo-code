/**
 * @description 登录验证
 */
const{ ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * API 登录验证
 * @param {Object} ctx
 * @param {Object} next
 */
async function loginCheck(ctx, next) {
    if(ctx.session && ctx.session.userInfo) {
        await next()
        return
    }
    ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面 登录验证
 * @param {Object} ctx
 * @param {Object} next
 */
async function loginRedirect(ctx, next) {
    if(ctx.session && ctx.session.userInfo) {
        await next()
        return
    }
    const curUrl = ctx.url
    ctx.redirect('./login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
    loginCheck,
    loginRedirect
}