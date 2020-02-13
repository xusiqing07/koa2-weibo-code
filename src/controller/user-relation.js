/**
 * @description 用户关系 controller
 */

const { getUsersByFollower } = require('../service/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

/**
 * 根据 userid 获取粉丝列表
 * @param {number} userId 用户 id
 */
async function getFans(userId) {
    const { count, userList } = await getUsersByFollower(userId)

    // 返回
    return new SuccessModel({
        count,
        fansList: userList
    })
}

module.exports = {
    getFans
}
