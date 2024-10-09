/*
Intercept and handle the form submission event,
and make a GET request to the back-end server to get the jobs.
Note:
It is preferred (for the automated testing to pass correctly)
that you use the "SEARCH (GET) Jobs" get job endpoint to do this.
*/
import { getJobs } from "./api.js";

export function handleFormSubmission() {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const search = formData.get("search");
    const jobs = await getJobs(search);
    console.log(jobs);
  });
}
