import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import genrateToken from "../../utils/generateToken.js";
import Company from "../../models/companyModel/companySchema.js";
import Job from "../../models/companyModel/jobSchema.js";
// register new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;
  if (!name || !email || !password || !imageFile) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res
        .status(400)
        .json({ success: false, message: "Company already exists" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: "job-portal/companies",
      resource_type: "image",
    });
    const newCompany = new Company({
      name,
      email,
      image: imageUpload.secure_url,
      password: hashedPassword,
    });
    await newCompany.save();
    const token = genrateToken(newCompany._id);
    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company: {
        _id: newCompany._id,
        name: newCompany.name,
        email: newCompany.email,
        image: newCompany.image,
      },
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
// company login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res
        .status(400)
        .json({ success: false, message: "Company not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    const token = genrateToken(company._id);
    res.status(200).json({
      success: true,
      message: "Company logged in successfully",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
// get company data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({
      success: true,
      message: "Company data fetched successfully",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// add company jobPost
export const addCompanyJobPost = async (req, res) => {
  const { title, location, salary, description, level, category } = req.body;
  const companyId = req.company._id;
  try {
    const newJob = new Job({
      title,
      location,
      salary,
      description,
      level,
      category,
      date: new Date(),
      visible: true,
      companyId,
    });
    await newJob.save();
    res.json({
      success: true,
      message: "Job post created successfully",
      job: newJob,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });
    res.json({ success: true, jobs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// change job application status
export const changeJobApplicationStatus = async (req, res) => {};
// change application visibility
export const changeApplicationVisibility = async (req, res) => {
  try {
    const {id}=req.body;
    const companyId=req.company._id;

    const job = await Job.findById(id)
    if(companyId.toString()===job.companyId.toString()){
      job.visible = !job.visible;
    }
    await job.save();
    res.json({success:true,message:"Application visibility changed successfully",job})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
};
