import { insertUserInfo, getUserInfo,tokenToGetUserinfo } from './userInfo.js'
import { getPoetry } from './getPoetry.js'
import { getBlog } from './getBlog.js'

export const insertUserInfoMysql = insertUserInfo
export const getUserInfoMysql = getUserInfo
export const tokenToGetUserinfoMysql = tokenToGetUserinfo

export const getPoetryMysql = getPoetry

export const getBlogMysql = getBlog