import Job from "../../models/companyModel/jobSchema.js";

// get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });
    res.json({
      success: true,
      message: "All jobs fetched successfully",
      jobs,
    });
  } catch (error) {}
};

// get job by id
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });
    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }
    res.json({
      success: true,
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
