import Router from '@koa/router'
import { getCode, codeLogin, passwordLogin } from '../../app/login/index.js'

const router  = new Router()

router.get('/email/code',getCode)
router.post('/email/login',codeLogin)
router.post('/login',passwordLogin)

export default router