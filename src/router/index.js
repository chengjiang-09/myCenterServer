import Router from '@koa/router'
import loginRouter from './login/index.js'

const router = new Router()

router.use(loginRouter.routes())

export default router