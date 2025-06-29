import express from 'express';
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../../controller/userController/userController.js';
import upload from '../../../config/multer.js';

const userRouter=express.Router();

// get user data
userRouter.get('/user',getUserData)
// apply job post
userRouter.post('/apply',applyForJob)
// get applied job data
userRouter.get('/applications',getUserJobApplications)
// update user resume
userRouter.post('update-resume',upload.single('resume'),updateUserResume)

export default userRouter;