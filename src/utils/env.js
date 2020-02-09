/**
 * @description 环境变量
 */

const ENV = process.env.NODE_ENV

module.exports = {
    isDev: ENV === 'dev',
    notDev: Env !== 'dev',
    isProd: Env === 'production',
    notProd: Env !== 'production',
    isTest: ENV === 'test',
    notTest: Env !== 'test',
}