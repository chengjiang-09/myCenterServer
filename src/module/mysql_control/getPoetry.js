import { getMysqlPool } from '../db/mysql_db.js'

export const getPoetry = (ctx, next, pageNum) => {
    return new Promise((resolve) => {
        const db = getMysqlPool()
        const start = pageNum === 1 ? 0 : 15 * (pageNum - 1)
        const end = 15

        db.getConnection((err, connection) => {
            if (err) {
                console.log(err.message);
                db.end()
            } else {
                connection.query(`select * from poetry limit ${end} offset ${start}`, (err, data) => {
                    if (err) {
                        console.log(err.message);
                        db.end()
                    } else {
                        if (data[0]) {
                            resolve(ctx.response.body = {
                                status:1,
                                msg:'诗词数据获取成功！',
                                result: {
                                    data
                                }
                            })
                            db.end()
                        }else {
                            resolve(ctx.response.body = {
                                status:1,
                                msg:'诗词数据获取失败！',
                                result: {
                                }
                            })
                            db.end()
                        }
                    }
                })
            }
        })
    })
}
