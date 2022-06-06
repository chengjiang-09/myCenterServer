import getRedisConnection from '../db/redis_db.js'
import redisKey from '../../config/redisKey.js'

//校验短信/邮件验证码
export const verificationCode = async (email, code) => {

    const redis = getRedisConnection()

    const setKey = `${redisKey.VERIFY_CODE.code}${email}`

    let flag = false

    const promiseGetFlag = () => {
        return new Promise((resolve, reject) => {
            redis.get(setKey, (err, result) => {
                if (result) {
                    resolve(flag = parseInt(code) === parseInt(result))
                }
            })
        })
    }
    await promiseGetFlag()

    return flag
}

//将手机号/邮箱与对应验证码存入redis数据库
export const setVerificationCode = (email, code) => {
    const redis = getRedisConnection()

    const setKey = `${redisKey.VERIFY_CODE.code}${email}`

    redis.set(setKey, code, 'EX', redisKey.VERIFY_CODE.expireTime)
}

//删除验证码
export const removeVerificationCode = (email) => {
    const redis = getRedisConnection()

    const setKey = `${redisKey.VERIFY_CODE.code}${email}`

    redis.del(setKey)
}
