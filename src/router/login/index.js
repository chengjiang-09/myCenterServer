import Router from '@koa/router'
import { getCode, codeLogin } from '../../app/login/index.js'

const router  = new Router()

router.get('/mobile/code',getCode)
router.post('/mobile/login',codeLogin)

export default router