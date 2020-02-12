/**
 * @description 首页controller
 */

const { createBlogFailInfo } = require('../model/ErrorInfo')
const { createBlog } = require('../service/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const xss = require('xss')

/**
 * 创建微博
 * @param {*} param0 用户id 微博内容 图片 { userId, content, image }
 */
async function create({ userId, content, image }) {
    try {
        const blog = await createBlog({ userId, content: xss(content), image })
        return new SuccessModel(blog)
    } catch(e) {
        console.error(e.message, e.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

module.exports = {
    create
}
