import { insertUserInfo, getUserInfo,tokenToGetUserinfo } from './userInfo.js'
import { getPoetry } from './getPoetry.js'
import { getBlog } from './getBlog.js'
import { sendFootprint, getCommentsList, getCommentsMaxNum } from './comments.js'

export const insertUserInfoMysql = insertUserInfo
export const getUserInfoMysql = getUserInfo
export const tokenToGetUserinfoMysql = tokenToGetUserinfo

export const getPoetryMysql = getPoetry

export const getBlogMysql = getBlog

export const sendFootprintMysql = sendFootprint
export const getCommentsListMysql = getCommentsList
export const getCommentsMaxNumMysql = getCommentsMaxNum