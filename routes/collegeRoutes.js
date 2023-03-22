import {Router} from 'express'
import { deleteCollege, getSavedCollege, likeCollegeName, saveApiData, searchCollege, searchCollegeById, searchDegreeById } from '../controllers/collegeControllers.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
const router = Router()

// Post
router.post('/search',searchCollege)

/// Get
router.get('/searchDegree/:id',searchDegreeById)
router.get('/searchCollegeById/:id',searchCollegeById)
router.get("/getSavedData",authMiddleware,getSavedCollege)

// Put
router.put('/likeCollegeName/:id',authMiddleware,likeCollegeName)

// Delete
router.put("/deleteCollege",authMiddleware,deleteCollege)


export default router