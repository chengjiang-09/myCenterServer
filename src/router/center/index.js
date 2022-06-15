import Router from '@koa/router'
import { getBlog, getPoetry, sendFootprint, getCommentsList, getCommentsMaxNum } from '../../app/center/index.js'

const router = new Router()

router.get('/poetry',getPoetry)
router.get('/blog',getBlog)
router.post('/footprint',sendFootprint)
router.get('/comments',getCommentsList)
router.get('/commentsMaxNum',getCommentsMaxNum)

export default router