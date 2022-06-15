// 生成随机6位验证码
import { simulationVerificationCode } from './simulationVerificationCode.js'
// 将对应邮箱和验证码存入redis,过期时间300秒
import { setVerificationCodeRedis, verificationCodeRedis, removeVerificationCodeRedis } from '../../module/redis_control/index.js'
// 发送邮件验证码
import { sendVerificationCode } from './sendEmailVericationCode.js'
// 将用户信息操作
import { insertUserInfoMysql, getUserInfoMysql } from '../../module/mysql_control/index.js'

export const getCode = (ctx, next) => {

  const { email } = ctx.request.query
  const code = simulationVerificationCode()

  try {
    removeVerificationCodeRedis(email)
    sendVerificationCode(email, code)
    setVerificationCodeRedis(email, code)

    ctx.response.body = {
      status: 1,
      msg: '验证信息接收成功！'
    }
  } catch (e) {
    console.log(e);

    ctx.response.body = {
      status: 0,
      msg: '验证信息接收失败！',
    }
  }
}

export const codeLogin = async (ctx, next) => {
  const { email, code } = ctx.request.body
  const emailList = email.split('@')
  const name = emailList[0]

  const flag = await verificationCodeRedis(email, code)

  removeVerificationCodeRedis(email)

  if (flag) {
    try {
      await insertUserInfoMysql(ctx, email, name, "123456")

    } catch (err) {
      console.log(err.message);
    } finally {
      await getUserInfoMysql(ctx, next, email)
    }
  } else {
    ctx.response.body = {
      status: 0,
      msg: "邮箱或验证码错误！",
      result: {}
    }
  }
}

export const passwordLogin = async (ctx, next) => {
  const { email, password } = ctx.request.body
  try {
    await getUserInfoMysql(ctx, next, email, password)

  } catch (err) {
    console.log(err.message);
  }
}