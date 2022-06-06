import Router from '@koa/router'
import { getUserInfo } from '../../app/userInfo/index.js'

const router = new Router()

router.post('/getuserinfo',getUserInfo)

export default router