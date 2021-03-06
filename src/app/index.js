import Koa from 'koa'
import Cors from '@koa/cors'
import koaBody from 'koa-body'
import router from '../router/index.js'
import jwt from 'koa-jwt'
import unlessPash from '../config/unlessPath.config.js'
import { secret } from '../config/jwtSecert.js'

const app = new Koa()

app.use(Cors())
app.use(koaBody({
    multipart:true,
    parsedMethods: ['POST','PUT','PATCH'],
    formidable:{
        multiples:true,
        maxFieldsSize:10*1024*1024,
        // uploadDir
    }
}))
app.use(jwt({
    secret
}).unless({
    path:unlessPash
}))
app.use(async (ctx, next) => {
    try{
        await next()
    }catch(err) {
        ctx.response.status = err.statusCode || err.status || 500

        ctx.response.body = {
            msg: err.message,
            result:{
                status:0
            }
        }
    }
})
app.use(router.routes())
export default app