import express from 'express';
import { registerCompany,loginCompany,getCompanyData,addCompanyJobPost,changeJobApplicationStatus,changeApplicationVisibility } from '../../controller/companyController/companyController.js';
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
// Change application visibility
Companyrouter.put('/application/visibility',protectCompany, changeApplicationVisibility);

export default Companyrouter;
