/*
Intercept and handle the form submission event,
and make a GET request to the back-end server to get the jobs.
Note:
It is preferred (for the automated testing to pass correctly)
that you use the "SEARCH (GET) Jobs" get job endpoint to do this.
*/
// Import the necessary functions
import { fetcher } from "../utils/fetcher.js";

// Function to get jobs
export async function getJobs(search) {
  const url = `http://localhost:3000/jobs?q=${encodeURIComponent(search)}`;
  return await fetcher(url);
}

// Function to get job details
export async function getJobDetails(jobId) {
  const url = `http://localhost:3000/jobs/${jobId}`;
  return await fetcher(url);
}