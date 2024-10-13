/*
Intercept and handle the form submission event,
and make a GET request to the back-end server to get the jobs.
Note:
It is preferred (for the automated testing to pass correctly)
that you use the "SEARCH (GET) Jobs" get job endpoint to do this.
*/
import { fetcher } from "../utils/fetcher.js";

// Temporary in-memory storage for saved jobs
const savedJobsStorage = [];

// Function to fetch jobs
export async function getJobs(search) {
  const url = `http://localhost:3000/jobs?q=${encodeURIComponent(search)}`;
  return await fetcher(url);
}

// Function to fetch job details
export async function getJobDetails(jobId) {
  if (!jobId) {
    console.error("Job ID is null or undefined");
    return null; // Return null if job ID is invalid
  }
  const url = `http://localhost:3000/jobs/${jobId}`;
  try {
    return await fetcher(url);
  } catch (error) {
    console.error("Error fetching job details:", error);
    return null; // Return null if there is an error
  }
}

// Function to save a job
export async function saveJob(job) {
  console.log("Saving job:", job); // Debugging log
  // Check if the job is already saved
  const existingJob = savedJobsStorage.find(savedJob => savedJob.id === job.id);
  if (!existingJob) {
    savedJobsStorage.push(job);
    console.log("Job saved:", job); // Debugging log
  } else {
    console.log("Job already saved:", job); // Debugging log
  }
  console.log("Current saved jobs:", savedJobsStorage); // Debugging log
  return job;
}

// Function to get saved jobs
export async function getSavedJobs() {
  console.log("Retrieving saved jobs:", savedJobsStorage); // Debugging log
  return savedJobsStorage;
}


