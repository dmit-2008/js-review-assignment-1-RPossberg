/*
Intercept and handle the form submission event,
and make a GET request to the back-end server to get the jobs.
Note:
It is preferred (for the automated testing to pass correctly)
that you use the "SEARCH (GET) Jobs" get job endpoint to do this.
*/
export async function getJobs(search) {
  try {
    const response = await fetch(
      `http://localhost:5173/jobs?search=${encodeURIComponent(search)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jobs = await response.json();
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function getJobDetails(jobId) {
  try {
    const response = await fetch(`http://localhost:5173/jobs/${jobId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const job = await response.json();
    return job;
  } catch (error) {
    console.error("Error fetching job details:", error);
    return null;
  }
}
