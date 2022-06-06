import { getPoetryMysql, getBlogMysql } from '../../module/mysql_control/index.js'

export const getPoetry = async (ctx, next) => {
    await getPoetryMysql(ctx, next, 1)
}

export const getBlog = async (ctx, next) => {

    const { pageNum } = ctx.request.query

    await getBlogMysql(ctx, next, pageNum)

}