import express from "express";
import { getAllJobs, getJobById } from "../../controller/jobController/jobController.js";

const jobRouter = express.Router();

// Get all jobs
jobRouter.get("/", getAllJobs);
// Get job by ID
jobRouter.get("/:id", getJobById);

export default jobRouter;
