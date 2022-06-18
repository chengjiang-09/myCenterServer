import mysql from 'mysql'

export const getMysqlPool = () => {
    return mysql.createPool({
        host:'127.0.0.1',
        port:3306,
        user:'root',
        password:'',
        database:'center_db'
    })
}