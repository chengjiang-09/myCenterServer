import { tokenToGetUserinfo } from '../../module/mysql_control/userInfo.js'

export const getUserInfo = async (ctx, next) => {
    await tokenToGetUserinfo(ctx, next)
}