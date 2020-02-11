/**
 * @description User controller
 */

const { getUserInfo, createUser, deleteUser } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo } = require('../model/ErrorInfo')
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

/**
 * 登录
 * @param {Object} ctx
 * @param {string} userName
 * @param {string} password
 */
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

/**
 *
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if(result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteUserFailInfo)
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser
}