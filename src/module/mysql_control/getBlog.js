import { getMysqlPool } from '../db/mysql_db.js'

export const getBlog = (ctx, next, pageNum) => {
    return new Promise((resolve) => {
        const db = getMysqlPool()
        const start = 5 * (pageNum - 1)
        const end = 5

        db.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                db.end()
            } else {
                connection.query("select * from blogs",(err, data) => {
                    if(err){
                        console.log(err);
                        db.end()
                    } else {
                        if(data[0]){
                            const maxPageNum = Math.ceil(data.length / 5)

                            connection.query(`select * from blogs limit ${end} offset ${start}`, (err2, data2) => {
                                if (err) {
                                    console.log(err2);
                                    db.end()
                                } else {
                                    if (data[0]) {
                                        resolve(
                                            ctx.response.body = {
                                                status: 1,
                                                msg: `博客文章数据获取成功(第${pageNum}页)！`,
                                                result: {
                                                    maxPageNum,
                                                    data:data2
                                                }
                                            }
                                        )
                                    }else {
                                        resolve(
                                            ctx.response.body = {
                                                status: 0,
                                                msg: `博客文章数据获取失败！`,
                                                result: {
                                                }
                                            }
                                        )
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    })

}