// Initialize the application
console.log("Hello from index.js!");

import "bootstrap/dist/css/bootstrap.min.css";
import { getJobs, getJobDetails, saveJob, getSavedJobs } from "./api/jobs.js"; // Import the necessary functions
import { jobCard } from "./templates/jobcard.js"; // Import the jobCard function
import { displayJobDetails } from "./templates/jobdetails.js"; // Import the displayJobDetails function

document.addEventListener("DOMContentLoaded", () => {
  // Global variables
  const jobDetailsCard = document.getElementById("job-details-card"); // Get the job details card element
  const searchForm = document.getElementById("search-jobs-form"); // Get the search form element
  const searchInput = document.getElementById("query-input"); // Get the search input element
  const searchTabLink = document.getElementById("search-tab-link"); // Get the "Search" tab link element
  const myBookmarkedJobsLink = document.getElementById("my-bookmarked-jobs-link"); // Get the "My Bookmarked Jobs" link element
  const searchJobsTab = document.getElementById("search-jobs-tab"); // Get the search jobs tab element
  const myJobsTab = document.getElementById("my-jobs-tab"); // Get the saved jobs tab element

  // Function to fetch jobs and display them
  async function displayJobs(search = "") {
    try {
      // Clear job details card
      jobDetailsCard.innerHTML = "";

      const jobs = await getJobs(search);
      const jobList = document.getElementById("searched-jobs");
      jobList.innerHTML = ""; // Clear previous search results

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
          } else {
            alert("Job not found. Please try again later.");
          }
        }
      });
    } catch (error) {
      console.error("Error displaying jobs:", error);
    }
  }

  // Function to fetch and display saved jobs
  async function displaySavedJobs() {
    try {
      const savedJobs = await getSavedJobs(); // Fetch saved jobs
      console.log("Saved jobs:", savedJobs); // Debugging log
      const savedJobList = document.getElementById("my-jobs");
      savedJobList.innerHTML = ""; // Clear previous saved jobs

      if (savedJobs.length === 0) {
        savedJobList.innerHTML = '<div class="text-dark">No Saved Jobs</div>';
        return;
      }

      savedJobs.forEach((job) => {
        const jobCardElement = jobCard(job);
        savedJobList.appendChild(jobCardElement);
      });

      // Add event listener to view job details using event delegation
      savedJobList.addEventListener("click", async (event) => {
        const button = event.target.closest(".view-job-button");
        if (button) {
          const jobId = button.getAttribute("job-data-id");
          const job = await getJobDetails(jobId);
          if (job) {
            displayJobDetails(job);
          } else {
            alert("Job not found. Please try again later.");
          }
        }
      });
    } catch (error) {
      console.error("Error displaying saved jobs:", error);
    }
  }

  // Handle form submission for job search
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = searchInput.value;
    await displayJobs(query);
  });

  // Call the function to display jobs on page load
  displayJobs();

  // Handle tab switching
  searchTabLink.addEventListener("click", (event) => {
    event.preventDefault();
    searchTabLink.classList.add("active");
    myBookmarkedJobsLink.classList.remove("active");
    searchJobsTab.classList.remove("d-none");
    myJobsTab.classList.add("d-none");
  });

  myBookmarkedJobsLink.addEventListener("click", async (event) => {
    event.preventDefault();
    searchTabLink.classList.remove("active");
    myBookmarkedJobsLink.classList.add("active");
    searchJobsTab.classList.add("d-none");
    myJobsTab.classList.remove("d-none");
    await displaySavedJobs();
  });

  // Add event listener to save job from job details card
  document.addEventListener("click", async (event) => {
    const button = event.target.closest(".save-job");
    if (button) {
      console.log("Save job button clicked!");
      const jobElement = button.closest(".card");
      const jobId = jobElement.getAttribute("job-data-id");
      if (!jobId) {
        console.error("Job ID is null or undefined");
        alert("Failed to save job. Please try again later.");
        return;
      }
      const job = await getJobDetails(jobId);
      if (job) {
        await saveJob(job);
        alert("Job saved successfully!");
      } else {
        alert("Failed to save job. Please try again later.");
      }
    }
  });
});