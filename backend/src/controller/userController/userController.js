import JobApplication from "../../models/companyModel/jobApplicationSchema.js";
import User from "../../models/userModel/userSchema.js";
// Get User Data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, messsage: error.message });
  }
};
// Apply for a job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;
  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });
    if (isAlreadyApplied.length > 0) {
      return res.json({
        success: false,
        message: "You have already applied for this job",
      });
    }
    const jobData = await JobApplication(jobId);
    if (!jobData) {
      return res.json({ success: false, message: "Job not found" });
    }
    await JobApplication.create({
      userId,
      companyId: jobData.companyId,
      jobId,
      status: "Pending",
      date: Date.now(),
    });
    res.json({ success: true, message: "Applied Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// Get user applied applicantions
export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();
    if (!applications) {
      return res.json({ success: false, message: "No job application found" });
    }
    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// update user resume
export const updateUserResume = async (req, res) => {
    try {
        const userId=req.auth.userId;
        const resumeFile=req.resumeFile;
        const userData=await User.findById(userId);
        if(resumeFile){
            const resumeUpload= await cloudinary.uploader.upload(resumeFile.path);
            userData.resume=resumeUpload.secure_url
        }
        await userData.save();
        return res.json({success:true,message:"Resume Updated"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
};
