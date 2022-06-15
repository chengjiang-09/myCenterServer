import Router from '@koa/router'
import { getBlog, getPoetry, sendFootprint, getCommentsList, getCommentsMaxNum,sendComment } from '../../app/center/index.js'

const router = new Router()

router.get('/poetry',getPoetry)
router.get('/blog',getBlog)
router.post('/footprint',sendFootprint)
router.get('/comments',getCommentsList)
router.get('/commentsMaxNum',getCommentsMaxNum)
router.post('/sendcomment',sendComment)

export default router