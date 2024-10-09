// Initialize the application
console.log("Hello from index.js!");

// Import the necessary functions
import "bootstrap/dist/css/bootstrap.min.css";
import { getJobs, getJobDetails } from "./api/jobs.js";
import { jobCard } from "./templates/jobcard.js";
import { displayJobDetails } from "./templates/jobdetails.js"; // Corrected import

// Function to fetch jobs and display them
async function displayJobs(search = "") {
  try {
    const jobs = await getJobs(search);
    const jobList = document.getElementById("searched-jobs");
    jobList.innerHTML = "";

    if (jobs.length === 0) {
      jobList.innerHTML = '<div class="text-dark">No Results Found</div>';
      return;
    }

    jobs.forEach((job) => {
      const jobCardElement = jobCard(job);
      jobList.appendChild(jobCardElement);
    });

    // Add event listener to view job details using event delegation
    jobList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("view-job-button")) {
        const jobId = event.target.getAttribute("job-data-id");
        const job = await getJobDetails(jobId);
        if (job) {
          displayJobDetails(job);
        }
      }
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    alert("Failed to fetch jobs. Please try again later.");
  }
}

// Handle form submission for job search
document
  .getElementById("search-jobs-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const query = document.getElementById("query-input").value;
    await displayJobs(query);
  });

// Call the function to display jobs on page load
displayJobs();
