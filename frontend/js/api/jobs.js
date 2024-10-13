/*
Intercept and handle the form submission event,
and make a GET request to the back-end server to get the jobs.
Note:
It is preferred (for the automated testing to pass correctly)
that you use the "SEARCH (GET) Jobs" get job endpoint to do this.
*/
// Import the necessary functions
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
  const url = `http://localhost:3000/jobs/${jobId}`;
  return await fetcher(url);
}

// Function to save a job
export async function saveJob(job) {
  console.log("Saving job:", job); // Added this line to check the job data
  // Check if the job is already saved
  const existingJob = savedJobsStorage.find(savedJob => savedJob.id === job.id);
  if (!existingJob) {
    savedJobsStorage.push(job);
  }
  return job;
}

// Function to get saved jobs
export async function getSavedJobs() {
  return savedJobsStorage;
}

// // Function to save a job
// export async function saveJob(jobId) {
//   const url = `http://localhost:3000/jobs`;
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ jobId }),
//   });
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return await response.json();
// }

// export async function getSavedJobs() {
//   const url = `http://localhost:3000/jobs`;
//   const savedJobs = await fetcher(url);
//   console.log("Fetched saved jobs:", savedJobs); // Add this line to check the fetched data
//   return savedJobs;
// }