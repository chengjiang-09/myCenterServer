import Router from '@koa/router'
import { getBlog, getPoetry } from '../../app/center/index.js'

const router = new Router()

router.get('/poetry',getPoetry)
router.get('/blog',getBlog)

export default router