//http2协议
import http from 'http'
import cluster from 'cluster'
import os from 'os'

import koaApp from './src/app/index.js'

const cpuNums = os.cpus().length

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
    const httpServer = http.createServer({
        allowHTTP1: true
    },koaApp.callback())

    httpServer.listen(8000,() => {
        console.log(`Server running at http://localhost:8000`);
    })
}

