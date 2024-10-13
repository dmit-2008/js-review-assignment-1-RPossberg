// Initialize the application
console.log("Hello from index.js!");

import "bootstrap/dist/css/bootstrap.min.css";
import { getJobs, getJobDetails } from "./api/jobs.js"; // Import the getJobs function
import { jobCard } from "./templates/jobcard.js"; // Import the jobCard function
import { displayJobDetails } from "./templates/jobdetails.js"; // Import the displayJobDetails function

// Global variables
const jobDetailsCard = document.getElementById("job-details-card"); // Get the job details card element
const searchForm = document.getElementById("search-jobs-form"); // Get the search form element
const searchInput = document.getElementById("query-input"); // Get the search input element

// Call the function to display jobs on page load
displayJobs();

// Handle form submission for job search
document
  .getElementById("search-jobs-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const query = document.getElementById("query-input").value;
    console.log("Search query:", query);
    await displayJobs(query);
  });

// Function to fetch jobs and display them


// Add event listener to the search form
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (searchInput) {
    const search = searchInput.value.trim().toLowerCase();
    await displayJobs(search);
  } else {
    console.error('Search input element not found');
  }
});

// Function to fetch jobs and display them
async function displayJobs(search = "") {
  try {
    const jobs = await getJobs(search);
    const jobList = document.getElementById("searched-jobs");
    console.log("Jobs fetched:", jobs); // Debugging: Log the fetched jobs
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
      const button = event.target.closest(".view-job-button");
      if (button) {
        const jobId = button.getAttribute("job-data-id");
        const job = await getJobDetails(jobId);
        if (job) {
          displayJobDetails(job);
        }
      }
    });
  } catch (error) {
    console.error("Error displaying jobs:", error);
  }
}
