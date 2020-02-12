/**
 * @description 时间格式处理
 */

const { format } = require('date-fns')

/**
 * 格式化时间
 * @param {string} str 时间字符串
 */
function timeFormat(str) {
    return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
    timeFormat
}