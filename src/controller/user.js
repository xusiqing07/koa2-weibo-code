/**
 * @description User controller
 */

const { getUserInfo, createUser } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo } = require('../model/ErrorInfo')
const { doCrypto } = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param {string} userName
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if(userInfo) {
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 用户注册
 * @param {Obiect} param0 用户的名字，密码，性别
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if(userInfo) {
        return  new ErrorModel(registerUserNameExistInfo)
    }
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch(e) {
        console.error(e.message, e.stack)
        return new ErrorModel(registerFailInfo)
    }
}

async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if(!userInfo) {
        return new ErrorModel(loginFailInfo)
    }
    if(ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}
module.exports = {
    isExist,
    register,
    login
}