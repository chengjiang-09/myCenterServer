import { getPoetryMysql, getBlogMysql, sendFootprintMysql, getCommentsListMysql, getCommentsMaxNumMysql } from '../../module/mysql_control/index.js'

export const getPoetry = async (ctx, next) => {
    await getPoetryMysql(ctx, next, 1)
}

export const getBlog = async (ctx, next) => {

    const { pageNum } = ctx.request.query

    await getBlogMysql(ctx, next, pageNum)

}

export const sendFootprint = async (ctx, next) => {

    await sendFootprintMysql(ctx, next)
}

export const getCommentsList = async (ctx, next) => {

    await getCommentsListMysql(ctx, next)

}

export const getCommentsMaxNum = async (ctx, next) => {

    await getCommentsMaxNumMysql(ctx,next)

}