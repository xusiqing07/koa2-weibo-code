/**
 * @description json schema 验证中间件
 */

const{ ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * 生成json schema验证的中间件
 * @param {functional} validateFn 验证函数
 */
function generateValidator(validateFn) {
    // 定义中间件函数
    async function validator(ctx, next) {
        const data = ctx.request.body
        const error = validateFn(data)
        if(error) {
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        await next()
    }
    // 返回中间件
    return validator
}

module.exports = {
    generateValidator
}