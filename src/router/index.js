import Router from '@koa/router'
import loginRouter from './login/index.js'
import userInfoRouter from './userInfo/index.js'
import centerRouter from './center/index.js'

const router = new Router()

router.use(loginRouter.routes())
router.use(userInfoRouter.routes())
router.use(centerRouter.routes())

export default router