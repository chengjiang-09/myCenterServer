import { getMysqlPool } from '../db/mysql_db.js'

const warningFc = (err, db, ctx) => {
    console.log(err.message);
    db.end()
    ctx.response.body = {
        status: 0,
        msg: "服务器端错误！",
        result: {
        }
    }
}


export const sendComment = (ctx, next) => {
    return new Promise(resolve => {

        const { masterName, masterID, author, context, date, topID } = ctx.request.body

        const db = getMysqlPool()

        db.getConnection((e,connection) => {
            if(e){
                console.log(e.message);
                db.end()
            }else {
                connection.query(`insert into comments(masterName,masterID,author,date,context,topID) values("${masterName}",${masterID},"${author}","${date}","${context}","${topID}")`,(err) => {
                    if(err){
                        console.log(err.message);
                        db.end()

                        ctx.response.body = {
                            status:0,
                            msg:"评论发送失败！"
                        }
                        resolve()
                    }else {
                        ctx.response.body = {
                            status:1,
                            msg:"评论发送成功！"
                        }

                        resolve()
                    }
                })
            }
        })

    })
}

export const sendFootprint = (ctx, next) => {
    return new Promise(resolve => {
        const db = getMysqlPool()

        const { masterName, masterID, author, date, context } = ctx.request.body

        db.getConnection((e, connection) => {
            if (e) {
                warningFc(e, db, ctx)
            } else {
                connection.query(`select count(*) from comments where author="${author}"`, (e, count) => {
                    if (e) {
                        warningFc(e, db, ctx)
                        resolve()
                    } else {
                        if (count[0]['count(*)'] > 5) {
                            ctx.response.body = {
                                status: 2,
                                msg: "抱歉~，每个用户仅限发送5条足迹信息，如有问题请通过网站下方邮箱联系管理员。"
                            }
                            resolve()
                        } else {
                            connection.query(`insert into comments(masterName,masterID,author,date,context,topID) values("${masterName}",${masterID},"${author}","${date}","${context}","${-1}")`, async (err) => {
                                if (err) {
                                    warningFc(err, db, ctx)
                                    resolve()
                                } else {
                                    ctx.response.body = {
                                        status: 1,
                                        msg: "发送成功！",
                                    }

                                    db.end()
                                    resolve()
                                }
                            })
                        }
                    }
                })
            }
        })
    })

}

export const getCommentsMaxNum = (ctx, next) => {
    return new Promise(resolve => {
        const db = getMysqlPool()

        db.getConnection((e, connection) => {
            if (e) {
                warningFc(e, db, ctx)
            } else {
                connection.query('select count(*) from comments where masterID=0', (err, data) => {
                    if (err) {
                        warningFc(selectErr, db, ctx)
                        resolve()
                    } else {
                        ctx.response.body = {
                            status: 1,
                            msg: "数据获取成功！",
                            result: {
                                commentsMaxNum: Math.ceil(data[0]['count(*)'] / 2)
                            }
                        }
                        db.end()
                        resolve()
                    }
                })
            }
        })
    })

}

export const getCommentsList = (ctx, next) => {
    return new Promise(resolve => {
        const db = getMysqlPool()

        const { pageNum } = ctx.request.query

        const nums = 2
        const start = (pageNum - 1) * nums

        db.getConnection((e, connection) => {
            if (e) {
                warningFc(e, db, ctx)
            } else {
                const allComments = []
                connection.query(`select * from comments where masterID=0 order by id desc limit ${nums} offset ${start}`, async (selectErr, data) => {
                    if (selectErr) {
                        warningFc(selectErr, db, ctx)
                        resolve()
                    } else {
                        allComments.push(...data)
                        const queryList = []

                        data.forEach(obj => {
                            queryList.push((() => {
                                return new Promise(resloveChild => {
                                    connection.query(`select * from comments where topID=${obj.id} order by id desc limit 100 offset 0`, (selectErr2, childDta) => {
                                        if (selectErr2) {
                                            warningFc(selectErr2, db, ctx)
                                            resloveChild()
                                        } else {

                                            resloveChild(allComments.push(...childDta))
                                        }
                                    })
                                })
                            })())
                        })

                        await Promise.all(queryList)

                        console.log(allComments);

                        ctx.response.body = {
                            status: 1,
                            msg: "数据获取成功！",
                            result: {
                                commentsList: allComments
                            }
                        }
                        db.end()
                        resolve()
                    }
                })
            }
        })
    })
}