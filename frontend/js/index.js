// Initialize the application
console.log("Hello from index.js!");

// Function to fetch jobs and display them
import "bootstrap/dist/css/bootstrap.min.css";
import { getJobs, getJobDetails } from "./api/jobs.js";

// Function to create a job card element
function createJobCard(job) {
  const li = document.createElement("li");
  li.className = "job-card card my-1";
  li.style.width = "18rem";
  li.innerHTML = `
    <div class="card-header">${job.company}</div>
    <div class="card-body">
      <h5 class="card-title">${job.title}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
      <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${new Date(
        job.date_posted
      ).toLocaleDateString()}</h6>
      <button class="btn btn-primary view-job-button" job-data-id="${
        job.id
      }">View Job</button>
    </div>
  `;
  return li;
}

// Function to display job details
function displayJobDetails(job) {
  const jobDetailsCard = document.getElementById("job-details-card");
  jobDetailsCard.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">${job.title}</h3>
        <h4 class="card-subtitle mb-2 text-body-secondary pb-3">${
          job.company
        }</h4>
        <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary pb-3">Posted ${new Date(
          job.date_posted
        ).toLocaleDateString()}</h6>
        <h5 class="card-subtitle mb-2">Description</h5>
        <p class="card-text">${job.description}</p>
        <h5 class="card-subtitle mb-2">Qualifications</h5>
        <p class="card-text">${job.qualifications}</p>
        <button class="btn btn-success save-job">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
          </svg>
          Save Job
        </button>
      </div>
    </div>
  `;
}

// Function to fetch jobs and display them
async function displayJobs(search = "") {
  const jobs = await getJobs(search);
  const jobList = document.getElementById("searched-jobs");
  jobList.innerHTML = "";

  if (jobs.length === 0) {
    jobList.innerHTML = '<div class="text-dark">No Results Found</div>';
    return;
  }

  jobs.forEach((job) => {
    const jobCard = createJobCard(job);
    jobList.appendChild(jobCard);
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
