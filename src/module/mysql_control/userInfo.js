import { getMysqlPool } from '../db/mysql_db.js'
import jsonwebtoken from 'jsonwebtoken'
import { secret } from '../../config/jwtSecert.js'

export const insertUserInfo = (ctx, email, name, password) => {
    return new Promise((resolve) => {
        const db = getMysqlPool()

        db.getConnection((err, connection) => {
            if (err) {
                console.log("数据库连接失败！");
                db.end()
            } else {
                console.log(email);
                connection.query(`insert into userinfo(email,name,password) values("${email}","${name}","${password}")`, (inserErr) => {
                    if (inserErr) {
                        console.log(inserErr.message);
                        db.end()
                    }
                    db.end()
                    resolve()
                })
            }
        })
    })
}

export const getUserInfo = (ctx, next, email, password) => {
    return new Promise((resolve) => {
        const db = getMysqlPool()
        db.getConnection((err, connection) => {
            if (err) {
                console.log("数据库连接失败！");
                db.end()
            } else {
                connection.query(`select * from userinfo where email="${email}"`, (getErr, data) => {
                    if (getErr) {
                        console.log(getErr.message);
                        db.end()
                    } else {
                        console.log(data);
                        if (data[0]) {
                            if (password) {
                                const pw = data[0].password

                                if (String(pw) === String(password)) {
                                    resolve(ctx.response.body = {
                                        status: 1,
                                        msg: "登录成功！",
                                        result: {
                                            name: data[0].name,
                                            id: data[0].id,
                                            email: data[0].email,
                                            token: jsonwebtoken.sign({
                                                name: data[0].name,
                                                id: data[0].id,
                                                email: data[0].email,
                                            }, secret, {expiresIn: '1h'}),
                                        }
                                    })
                                } else {
                                    resolve(ctx.response.body = {
                                        status: 0,
                                        msg: "邮箱或密码错误！",
                                        result: {}
                                    })
                                }
                            } else {
                                resolve(ctx.response.body = {
                                    status: 1,
                                    msg: "登录成功！",
                                    result: {
                                        name: data[0].name,
                                        id: data[0].id,
                                        email: data[0].email,
                                        token: jsonwebtoken.sign({
                                            name: data[0].name,
                                            id: data[0].id,
                                            email: data[0].email,
                                        }, secret, {expiresIn: '1h'}),
                                    }
                                })
                            }
                        } else {
                            resolve(ctx.response.body = {
                                status: 0,
                                msg: "该邮箱不存在！",
                                result: {}
                            })
                        }
                        db.end()
                    }
                })
            }
        })
    })
}

export const tokenToGetUserinfo = (ctx, next) => {
    return new Promise((resolve) => {
        const token = ctx.header.authorization
        const db = getMysqlPool()

        try {
            const { name, email, id, exp, iat } = jsonwebtoken.decode(token.split(' ')[1], secret)
            db.getConnection((err, connection) => {
                if (err) {
                    console.log("数据库连接失败！");
                    db.end()
                } else {
                    connection.query(`select * from userinfo where email="${email}"`, (err, data) => {
                        if (err) {
                            console.log(err.message);
                            db.end()
                        } else {
                            console.log(data[0]);
                            if (data[0]) {
                                if (iat > exp) {
                                    resolve(ctx.response.body = {
                                        status: 1,
                                        msg: "验证成功！",
                                        result: {
                                            name,
                                            id,
                                            email,
                                            token: jsonwebtoken.sign({
                                                name: data[0].name,
                                                id: data[0].id,
                                                email: data[0].email
                                            }, secret, {expiresIn: '1h'}),
                                        }
                                    })
                                } else {
                                    resolve(ctx.response.body = {
                                        status: 1,
                                        msg: "验证成功！",
                                        result: {
                                            name,
                                            id,
                                            email,
                                            token: token.split(' ')[1]
                                        }
                                    })
                                }
                            } else {
                                resolve(ctx.response.body = {
                                    status: 0,
                                    msg: "验证失败！",
                                    result: {
                                    }
                                })
                            }
                        }
                    })
                }
            })
        } catch (e) {
            console.log(e.message);
            resolve(ctx.response.body = {
                status: 0,
                msg: "验证失败！",
                result: {
                }
            })
        }
    })
}