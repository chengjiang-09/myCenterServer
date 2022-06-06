import fs from 'fs'
import { getMysqlPool } from '../../module/db/mysql_db.js'

let peotry = null
let blogs = null

peotry = JSON.parse(fs.readFileSync('./ancientPoetry.json', 'utf8'))
blogs = JSON.parse(fs.readFileSync('./blogs.json','utf8'))


const db = getMysqlPool()

const fn = () => {
    return new Promise((resolve) => {
        db.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                db.end()
            } else {
                Object.keys(peotry).forEach((key, index) => {
                    peotry[key].forEach((obj, index) => {
                        const { author, name, context, data } = obj
        
                        resolve(connection.query(`insert into poetry(author,name,context,data) values("${author}","${name}","${context}","${data}")`, (err, warning) => {
                            if (err) {
                                console.log(err);
                            }
                        }))
                    })
                })
                Object.keys(blogs).forEach((key, index) => {
                    blogs[key].forEach((obj, index) => {
                        const { picPlace, picName, title, context } = obj
        
                        resolve(connection.query(`insert into blogs(picPlace,picName,title,context) values("${picPlace}","${picName}","${title}","${context}")`, (err, warning) => {
                            if (err) {
                                console.log(err);
                            }
                        }))
                    })
                })
            }
        })
    })
}

await fn()
console.log("存入完成！");
db.end()
