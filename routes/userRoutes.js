import {Router} from 'express'
import { log_In, sign_Up } from '../controllers/userController.js'
const router = Router()

router.post('/signup',sign_Up)
router.post('/login',log_In)

export default router