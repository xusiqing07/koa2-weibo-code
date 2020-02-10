/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    const whereOpt = {
        userName
    }
    if(password) {
        Object.assign(whereOpt, { password })
    }
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if(result == null) {
        return result
    }
    const formatRes = formatUser(result)

    return formatRes

}

/**
 * 创建用户
 * @param {Obiect} param0 用户的名字，密码，性别，昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })
    return result.dataValues
}

module.exports = {
    getUserInfo,
    createUser
}
