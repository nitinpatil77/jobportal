import express from 'express';
import { registerCompany,loginCompany,getCompanyData,addCompanyJobPost,changeJobApplicationStatus,changeApplicationVisibility,getCompanyPostedJobs } from '../../controller/companyController/companyController.js';
import upload from '../../../config/multer.js';
import { protectCompany } from '../../middleware/authMiddleware.js';

const Companyrouter = express.Router();

// Register new company
Companyrouter.post('/register',upload.single('image'), registerCompany);
// Company login
Companyrouter.post('/login', loginCompany);
// Get company data
Companyrouter.get('/data', protectCompany,getCompanyData);
// Add company job posts
Companyrouter.post('/post-job',protectCompany, addCompanyJobPost);
// Change job application status
Companyrouter.put('/job-application/status',protectCompany, changeJobApplicationStatus);
// get company job list
Companyrouter.get('/list-jobs', protectCompany, getCompanyPostedJobs);
// Change application visibility
Companyrouter.post('/change-visibility',protectCompany, changeApplicationVisibility);

export default Companyrouter;
