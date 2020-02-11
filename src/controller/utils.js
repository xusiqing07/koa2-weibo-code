/**
 * @description utils controller
 */

const { SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')
const path = require('path')

// 文件存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 文件最大体积 1M
const MAX_SIZE = 1024 * 1024 * 1024

// 是否存在目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if(!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 保存文件
 * @param {*} param0 文件大小、路径、名称、类型
 */
async function saveFile({ size, filePath, name, type }) {
    if(size > MAX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }
    // 移动文件
    const fileName = Date.now() + '.' + name// 防止重名覆盖
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
    await fse.move(filePath, distFilePath)

    return new SuccessModel({
        url: './' + fileName
    })
}

module.exports = {
    saveFile
}