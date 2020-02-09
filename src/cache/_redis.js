/**
 * @description 连接redis的方法
 * @author xusiqing
 */

 const redis = require('redis')
 const { REDIS_CONF } = require('../conf/db')

 const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
 redisClient.on('error', err=>{
     console.log('redis error',err)
 })

 /**
  * 
  * @param {String} key 键
  * @param {String} val 值
  * @param {Number} timeout 过期时间 单位s
  */
 function set(key,val,timeout){
    if(typeof val === 'object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key,val)
    redisClient.expire(key,timeout)
 }
/**
 * 
 * @param {String} key 键
 */
 function get(key){
    const promise = new Promise((reject,resolve)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err)
                return
            }
            if(val===null){
                resolve(val)
                return
            }
            try{
                resolve(JSON.parse(val))
            }catch(e){
                resolve(val)
            }
        })
    })
    return promise
 }

 module.exports={
     set,
     get
 }
