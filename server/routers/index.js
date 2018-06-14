import Router from 'koa-router'
import { userinfo, login, logout } from '../controller/user'
const router = new Router()

router.get('/api/user', userinfo)
router.post('/api/login', login)
router.post('/api/logout', logout)
router.get('/api/logout', logout)

export default router
