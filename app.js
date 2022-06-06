import http2 from 'http2'
import path from 'path'
import fs from 'fs'
import koaStatic from 'koa-static'
import cluster from 'cluster'
import os from 'os'

import koaApp from './src/app/index.js'

const cpuNums = os.cpus().length
const certBase = path.join(path.resolve(), ".\\src\\public\\ssl\\7681157_azhmau.top_other")

koaApp.use(koaStatic(path.join(path.resolve(),'.\\src\\public\\static')))

if(cluster.isPrimary){
    for(let i = 0,len = cpuNums;i<len;i++){
        cluster.fork()
    }

    cluster.on('exit',() => {
        cluster.fork()
    })

    cluster.on('message',() => {
        cluster.fork()
    })
}else{
    const http2Server = http2.createSecureServer({
        key:fs.readFileSync(path.join(certBase,".\\7681157_azhmau.top.key")),
        cert:fs.readFileSync(path.join(certBase,".\\7681157_azhmau.top.pem")),
        allowHTTP1: true
    },koaApp.callback())

    http2Server.listen(8000,() => {
        console.log(`Server running at https://localhost:8000`);
    })
}

