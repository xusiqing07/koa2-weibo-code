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

/**
 *
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    return result > 0
}

/**
 * 更新用户信息
 * @param {*} param0 新的 { 用户名，昵称，城市，头像 }
 * @param {*} param1 查询条件 { 用户名、密码 }
 */
async function updateUser({ newPassword, newNickName, newCity, newPicture }, { userName, password }) {

    // 拼接修改内容
    const updateData = {}
    if(newPassword) {
        updateData.password = newPassword
    }
    if(newNickName) {
        updateData.nickName = newNickName
    }
    if(newCity) {
        updateData.city = newCity
    }
    if(newPicture) {
        updateData.picture = newPicture
    }
    // 拼接查询条件
    const whereData = {}
    if(password) {
        whereData.password = password
    }
    // 执行修改
    const result = await User.update(updateData, {
        where: whereData
    })

    return result[0] > 0// 修改的行数
}
module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}
