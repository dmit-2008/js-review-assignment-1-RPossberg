/*
Intercept and handle the form submission event,
and make a GET request to the back-end server to get the jobs.
Note:
It is preferred (for the automated testing to pass correctly)
that you use the "SEARCH (GET) Jobs" get job endpoint to do this.
*/
import { fetcher } from "../utils/fetcher.js";

export async function getJobs(search) {
  const url = `http://localhost:5173/jobs?search=${encodeURIComponent(search)}`;
  return await fetcher(url);
}

export async function getJobDetails(jobId) {
  const url = `http://localhost:5173/jobs/${jobId}`;
  return await fetcher(url);
}

// export { getJobs, getJobDetails };
