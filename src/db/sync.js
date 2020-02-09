/**
 * @description sequelize同步
 */
const seq = require('./seq')

//测试连接
seq.authenticate().then(()=>{
    console.log('ok')
}).catch(()=>{
    console.log('err')
})

//执行同步
seq.sync({force: true}).then(()=>{
    console.log('sync ok')
    process.exit()
})